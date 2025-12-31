/**
 * Google Sheets Content Loader for Laingsburg Area Food Bank
 * Fetches content from a published Google Sheet and renders it dynamically.
 * Falls back to hardcoded HTML content if loading fails.
 */

(function() {
  'use strict';

  // ============================================================
  // CONFIGURATION - Update SHEET_ID after creating your Google Sheet
  // ============================================================

  // Published Google Sheet URL base
  // To get this: File > Share > Publish to web > select CSV
  const PUBLISH_ID = '2PACX-1vQTgua-yeqSCyaR0Qr6Ou-e-ww2Hoo_U68BocF-ebY-_KAQyorocML79TSlExIMP8pXpG2b8nYI9cQ2';

  // GID for each tab (found in URL when clicking each tab)
  const TAB_GIDS = {
    alerts: '1417778854',
    hours: '591675384',
    closures: '1632629907',
    location: '1992149252',
    contact: '846985790',
    menu: '486580823',
    needs: '592805331',
    faq: '1487169672',
    about: '2127259791',
    services: '1660115934',
    volunteers: '764227431',
    supporters: '2PACX-1vQTgua-yeqSCyaR0Qr6Ou-e-ww2Hoo_U68BocF-ebY-_KAQyorocML79TSlExIMP8pXpG2b8nYI9cQ2' // TODO: Update with actual GID after creating the tab in Google Sheets
  };

  // Build tab URLs from publish ID and GIDs
  const TAB_URLS = {};
  Object.keys(TAB_GIDS).forEach(function(name) {
    TAB_URLS[name] = 'https://docs.google.com/spreadsheets/d/e/' + PUBLISH_ID + '/pub?output=csv&gid=' + TAB_GIDS[name];
  });

  // Cache settings
  const CACHE_PREFIX = 'lafb_';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  // ============================================================
  // CSV PARSING
  // ============================================================

  /**
   * Parse a CSV line handling quoted fields with commas
   * @param {string} line - CSV line to parse
   * @returns {string[]} Array of field values
   */
  function parseCSVLine(line) {
    var result = [];
    var current = '';
    var inQuotes = false;

    for (var i = 0; i < line.length; i++) {
      var char = line[i];
      if (char === '"') {
        // Handle escaped quotes (double quotes inside quoted field)
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  /**
   * Parse CSV text into array of objects
   * @param {string} text - Raw CSV text
   * @returns {Object[]} Array of objects with header keys
   */
  function parseCSV(text) {
    var lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    var headers = parseCSVLine(lines[0]);
    var data = [];

    for (var i = 1; i < lines.length; i++) {
      var values = parseCSVLine(lines[i]);
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j] || '';
      }
      data.push(obj);
    }

    return data;
  }

  // ============================================================
  // CACHING
  // ============================================================

  /**
   * Get cached data if still valid
   * @param {string} key - Cache key
   * @returns {Object[]|null} Cached data or null if expired/missing
   */
  function getCachedData(key) {
    try {
      var cached = localStorage.getItem(CACHE_PREFIX + key);
      if (!cached) return null;

      var parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return parsed.data;
    } catch (e) {
      return null;
    }
  }

  /**
   * Store data in cache with timestamp
   * @param {string} key - Cache key
   * @param {Object[]} data - Data to cache
   */
  function setCachedData(key, data) {
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (e) {
      // localStorage full or unavailable - continue without cache
    }
  }

  // ============================================================
  // DATA FETCHING
  // ============================================================

  /**
   * Fetch data from a sheet tab with caching
   * @param {string} tabName - Name of the sheet tab
   * @returns {Promise<Object[]|null>} Parsed data or null on failure
   */
  async function fetchWithCache(tabName) {
    // Try cache first
    var cached = getCachedData(tabName);
    if (cached) return cached;

    // Fetch from Google Sheets
    try {
      var url = TAB_URLS[tabName];
      var response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      var text = await response.text();
      var data = parseCSV(text);
      setCachedData(tabName, data);
      return data;
    } catch (error) {
      console.warn('Failed to fetch ' + tabName + ':', error.message);
      return null;
    }
  }

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Check if current date is within a date range
   * @param {string} startDate - Start date string (optional)
   * @param {string} endDate - End date string (optional)
   * @returns {boolean} True if current date is in range
   */
  function isDateInRange(startDate, endDate) {
    var now = new Date();
    now.setHours(0, 0, 0, 0);

    if (startDate) {
      var start = new Date(startDate);
      if (isNaN(start.getTime())) return true; // Invalid date, show anyway
      if (now < start) return false;
    }

    if (endDate) {
      var end = new Date(endDate);
      if (isNaN(end.getTime())) return true; // Invalid date, show anyway
      end.setHours(23, 59, 59, 999); // End of day
      if (now > end) return false;
    }

    return true;
  }

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

  /**
   * Render alerts banner at top of page
   * @param {Object[]} data - Alert data from alerts tab
   */
  function renderAlerts(data) {
    var container = document.getElementById('site-alerts');
    if (!container || !data || data.length === 0) return;

    // Filter to active alerts within date range
    var activeAlerts = data.filter(function(alert) {
      if (!alert.active || alert.active.toLowerCase() !== 'true') return false;
      return isDateInRange(alert.start_date, alert.end_date);
    });

    if (activeAlerts.length === 0) {
      container.hidden = true;
      return;
    }

    container.innerHTML = activeAlerts.map(function(alert) {
      var type = alert.type || 'info';
      var html = '<div class="alert-banner alert-banner--' + escapeHTML(type) + '" role="alert">';
      html += '<div class="alert-banner__content">';
      if (alert.title) {
        html += '<strong class="alert-banner__title">' + escapeHTML(alert.title) + '</strong>';
      }
      html += '<span class="alert-banner__message">' + escapeHTML(alert.message) + '</span>';
      if (alert.link_url) {
        html += '<a href="' + escapeHTML(alert.link_url) + '" class="alert-banner__link">' + escapeHTML(alert.link_text || 'Learn more') + '</a>';
      }
      html += '</div>';
      html += '<button class="alert-banner__dismiss" aria-label="Dismiss alert">&times;</button>';
      html += '</div>';
      return html;
    }).join('');

    container.hidden = false;

    // Add dismiss handlers
    container.querySelectorAll('.alert-banner__dismiss').forEach(function(btn) {
      btn.addEventListener('click', function() {
        this.parentElement.remove();
        if (container.children.length === 0) {
          container.hidden = true;
        }
      });
    });
  }

  /**
   * Render hours section
   * @param {Object[]} data - Hours data from hours tab
   */
  function renderHours(data) {
    var hoursList = document.querySelector('.hours-list');
    if (!hoursList || !data || data.length === 0) return;

    hoursList.innerHTML = data.map(function(item) {
      return '<div class="hours-item">' +
        '<dt>' + escapeHTML(item.day) + '</dt>' +
        '<dd>' + escapeHTML(item.open) + ' – ' + escapeHTML(item.close) + '</dd>' +
        '</div>';
    }).join('');
  }

  /**
   * Render closures section
   * @param {Object[]} data - Closures data from closures tab
   */
  function renderClosures(data) {
    var closureList = document.querySelector('.closure-list');
    if (!closureList || !data || data.length === 0) return;

    closureList.innerHTML = data.map(function(item) {
      return '<li class="closure-item">' +
        '<span class="closure-date">' + escapeHTML(item.date) + '</span>' +
        '<span class="closure-name">' + escapeHTML(item.name) + '</span>' +
        '</li>';
    }).join('');
  }

  /**
   * Render location section
   * @param {Object[]} data - Location data from location tab (single row)
   */
  function renderLocation(data) {
    var locationCard = document.querySelector('#hours .info-card--location address');
    if (!locationCard || !data || data.length === 0) return;

    var loc = data[0]; // Single row
    var address = escapeHTML(loc.name) + '<br>' +
      escapeHTML(loc.street) + '<br>' +
      escapeHTML(loc.city) + ', ' + escapeHTML(loc.state) + ' ' + escapeHTML(loc.zip);

    locationCard.innerHTML = address;

    // Update map link
    var mapLink = document.querySelector('#hours .info-card--location .map-link');
    if (mapLink) {
      var mapQuery = encodeURIComponent(loc.street + ' ' + loc.city + ' ' + loc.state + ' ' + loc.zip);
      mapLink.href = 'https://maps.google.com/?q=' + mapQuery;
    }
  }

  /**
   * Render contact section
   * @param {Object[]} data - Contact data from contact tab (single row)
   */
  function renderContact(data) {
    if (!data || data.length === 0) return;
    var contact = data[0]; // Single row

    // Update phone
    var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
      if (contact.phone) {
        var phoneNumber = contact.phone.replace(/[^0-9+]/g, '');
        link.href = 'tel:' + phoneNumber;
        if (link.classList.contains('contact-link--phone')) {
          link.textContent = contact.phone;
        }
      }
    });

    // Update email
    var emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(function(link) {
      if (contact.email) {
        link.href = 'mailto:' + contact.email;
        if (link.classList.contains('contact-link--email')) {
          link.textContent = contact.email;
        }
      }
    });

    // Update Facebook
    var fbLink = document.querySelector('.contact-link--social');
    if (fbLink && contact.facebook) {
      fbLink.href = contact.facebook;
    }
  }

  /**
   * Render food menu section
   * @param {Object[]} data - Menu data from menu tab
   */
  function renderMenu(data) {
    var menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid || !data || data.length === 0) return;

    // Group items by category
    var categories = {
      produce: { title: 'Produce', items: [] },
      proteins: { title: 'Proteins', items: [] },
      grains_dairy: { title: 'Grains & Dairy', items: [] },
      pantry: { title: 'Pantry Staples', items: [] }
    };

    data.forEach(function(row) {
      var cat = row.category;
      if (categories[cat]) {
        categories[cat].items.push(row.item);
      }
    });

    menuGrid.innerHTML = Object.keys(categories).map(function(key) {
      var cat = categories[key];
      return '<div class="menu-card">' +
        '<h3>' + escapeHTML(cat.title) + '</h3>' +
        '<ul class="menu-list">' +
        cat.items.map(function(item) {
          return '<li>' + escapeHTML(item) + '</li>';
        }).join('') +
        '</ul>' +
        '</div>';
    }).join('');
  }

  /**
   * Render needs section
   * @param {Object[]} data - Needs data from needs tab
   */
  function renderNeeds(data) {
    var needsGrid = document.querySelector('.needs-grid');
    if (!needsGrid || !data || data.length === 0) return;

    // Group items by priority
    var priorities = {
      most_needed: { title: 'Most Needed Items', className: 'needs-card needs-card--urgent', items: [] },
      always_welcome: { title: 'Always Welcome', className: 'needs-card', items: [] },
      non_food: { title: 'Non-Food Items', className: 'needs-card', items: [] }
    };

    data.forEach(function(row) {
      var priority = row.priority;
      if (priorities[priority]) {
        priorities[priority].items.push(row.item);
      }
    });

    needsGrid.innerHTML = Object.keys(priorities).map(function(key) {
      var p = priorities[key];
      return '<div class="' + p.className + '">' +
        '<h3>' + escapeHTML(p.title) + '</h3>' +
        '<ul class="needs-list">' +
        p.items.map(function(item) {
          return '<li>' + escapeHTML(item) + '</li>';
        }).join('') +
        '</ul>' +
        '</div>';
    }).join('');
  }

  /**
   * Render FAQ section
   * @param {Object[]} data - FAQ data from faq tab
   */
  function renderFAQ(data) {
    var faqList = document.querySelector('.faq-list');
    if (!faqList || !data || data.length === 0) return;

    // Sort by order field if present
    var sorted = data.slice().sort(function(a, b) {
      return (parseInt(a.order, 10) || 999) - (parseInt(b.order, 10) || 999);
    });

    faqList.innerHTML = sorted.map(function(item) {
      return '<details class="faq-item">' +
        '<summary>' + escapeHTML(item.question) + '</summary>' +
        '<p>' + escapeHTML(item.answer) + '</p>' +
        '</details>';
    }).join('');
  }

  /**
   * Render about section
   * @param {Object[]} data - About data from about tab
   */
  function renderAbout(data) {
    var aboutContent = document.querySelector('.about-content');
    if (!aboutContent || !data || data.length === 0) return;

    // Create a map of sections
    var sections = {};
    data.forEach(function(row) {
      sections[row.section] = row;
    });

    // Expected sections: mission, story, service_area
    var order = ['mission', 'story', 'service_area'];

    aboutContent.innerHTML = order.map(function(key) {
      var section = sections[key];
      if (!section) return '';
      return '<div class="about-text">' +
        '<h3>' + escapeHTML(section.title) + '</h3>' +
        '<p>' + escapeHTML(section.content) + '</p>' +
        '</div>';
    }).join('');
  }

  /**
   * Render services section
   * @param {Object[]} data - Services data from services tab
   */
  function renderServices(data) {
    var servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid || !data || data.length === 0) return;

    // Sort by order field if present
    var sorted = data.slice().sort(function(a, b) {
      return (parseInt(a.order, 10) || 999) - (parseInt(b.order, 10) || 999);
    });

    servicesGrid.innerHTML = sorted.map(function(item) {
      return '<div class="service-card">' +
        '<h3>' + escapeHTML(item.title) + '</h3>' +
        '<p>' + escapeHTML(item.description) + '</p>' +
        '</div>';
    }).join('');
  }

  /**
   * Render volunteers section
   * @param {Object[]} data - Volunteers data from volunteers tab
   */
  function renderVolunteers(data) {
    var volunteerGrid = document.querySelector('.volunteer-grid');
    if (!volunteerGrid || !data || data.length === 0) return;

    // Sort by order field if present
    var sorted = data.slice().sort(function(a, b) {
      return (parseInt(a.order, 10) || 999) - (parseInt(b.order, 10) || 999);
    });

    volunteerGrid.innerHTML = sorted.map(function(item) {
      return '<div class="volunteer-card">' +
        '<h3>' + escapeHTML(item.title) + '</h3>' +
        '<p>' + escapeHTML(item.description) + '</p>' +
        '</div>';
    }).join('');
  }

  /**
   * Render supporters section
   * Expected columns: name, url, order (optional)
   * @param {Object[]} data - Supporters data from supporters tab
   */
  function renderSupporters(data) {
    var supportersList = document.querySelector('.supporters-list');
    if (!supportersList || !data || data.length === 0) return;

    // Sort by order field if present
    var sorted = data.slice().sort(function(a, b) {
      return (parseInt(a.order, 10) || 999) - (parseInt(b.order, 10) || 999);
    });

    supportersList.innerHTML = sorted.map(function(item) {
      var html = '<li class="supporter-item">';
      if (item.url) {
        html += '<a href="' + escapeHTML(item.url) + '" target="_blank" rel="noopener noreferrer">';
        html += escapeHTML(item.name);
        html += ' <span class="visually-hidden">(opens in new tab)</span>';
        html += '</a>';
      } else {
        html += '<span>' + escapeHTML(item.name) + '</span>';
      }
      html += '</li>';
      return html;
    }).join('');
  }

  // ============================================================
  // MAIN LOADER
  // ============================================================

  /**
   * Load all content from Google Sheets
   */
  async function loadAllContent() {
    try {
      // Fetch all tabs in parallel
      var results = await Promise.allSettled([
        fetchWithCache('alerts'),
        fetchWithCache('hours'),
        fetchWithCache('closures'),
        fetchWithCache('location'),
        fetchWithCache('contact'),
        fetchWithCache('menu'),
        fetchWithCache('needs'),
        fetchWithCache('faq'),
        fetchWithCache('about'),
        fetchWithCache('services'),
        fetchWithCache('volunteers'),
        fetchWithCache('supporters')
      ]);

      // Render each section if data loaded successfully
      if (results[0].status === 'fulfilled' && results[0].value) {
        renderAlerts(results[0].value);
      }
      if (results[1].status === 'fulfilled' && results[1].value) {
        renderHours(results[1].value);
      }
      if (results[2].status === 'fulfilled' && results[2].value) {
        renderClosures(results[2].value);
      }
      if (results[3].status === 'fulfilled' && results[3].value) {
        renderLocation(results[3].value);
      }
      if (results[4].status === 'fulfilled' && results[4].value) {
        renderContact(results[4].value);
      }
      if (results[5].status === 'fulfilled' && results[5].value) {
        renderMenu(results[5].value);
      }
      if (results[6].status === 'fulfilled' && results[6].value) {
        renderNeeds(results[6].value);
      }
      if (results[7].status === 'fulfilled' && results[7].value) {
        renderFAQ(results[7].value);
      }
      if (results[8].status === 'fulfilled' && results[8].value) {
        renderAbout(results[8].value);
      }
      if (results[9].status === 'fulfilled' && results[9].value) {
        renderServices(results[9].value);
      }
      if (results[10].status === 'fulfilled' && results[10].value) {
        renderVolunteers(results[10].value);
      }
      if (results[11].status === 'fulfilled' && results[11].value) {
        renderSupporters(results[11].value);
      }

    } catch (error) {
      // Silent fail - hardcoded content remains
      console.warn('Content loading failed:', error);
    }
  }

  // Load content when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllContent);
  } else {
    loadAllContent();
  }

})();
