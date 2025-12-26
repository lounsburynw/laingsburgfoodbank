/**
 * Content Loader for Laingsburg Area Food Bank
 * Fetches YAML data files and renders content dynamically.
 * Falls back to hardcoded content if loading fails.
 */

(function() {
  'use strict';

  // Base path for data files
  const DATA_PATH = '_data/';

  /**
   * Fetch and parse a YAML file
   * @param {string} filename - Name of the YAML file
   * @returns {Promise<Object>} Parsed YAML data
   */
  async function fetchYAML(filename) {
    const response = await fetch(DATA_PATH + filename);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.status}`);
    }
    const text = await response.text();
    return jsyaml.load(text);
  }

  /**
   * Render hours section
   * @param {Object} data - Hours data from hours.yml
   */
  function renderHours(data) {
    const hoursList = document.querySelector('.hours-list');
    if (!hoursList || !data.hours) return;

    hoursList.innerHTML = data.hours.map(function(item) {
      return '<div class="hours-item">' +
        '<dt>' + escapeHTML(item.day) + '</dt>' +
        '<dd>' + escapeHTML(item.open) + ' – ' + escapeHTML(item.close) + '</dd>' +
        '</div>';
    }).join('');
  }

  /**
   * Render closures section
   * @param {Object} data - Closures data from hours.yml
   */
  function renderClosures(data) {
    var closureList = document.querySelector('.closure-list');
    if (!closureList || !data.closures) return;

    closureList.innerHTML = data.closures.map(function(item) {
      return '<li class="closure-item">' +
        '<span class="closure-date">' + escapeHTML(item.date) + '</span>' +
        '<span class="closure-name">' + escapeHTML(item.name) + '</span>' +
        '</li>';
    }).join('');
  }

  /**
   * Render location section
   * @param {Object} data - Location data from hours.yml
   */
  function renderLocation(data) {
    const locationCard = document.querySelector('#hours .info-card--location address');
    if (!locationCard || !data.location) return;

    const loc = data.location;
    const address = escapeHTML(loc.name) + '<br>' +
      escapeHTML(loc.street) + '<br>' +
      escapeHTML(loc.city) + ', ' + escapeHTML(loc.state) + ' ' + escapeHTML(loc.zip);

    locationCard.innerHTML = address;

    // Update map link
    const mapLink = document.querySelector('#hours .info-card--location .map-link');
    if (mapLink) {
      const mapQuery = encodeURIComponent(loc.street + ' ' + loc.city + ' ' + loc.state + ' ' + loc.zip);
      mapLink.href = 'https://maps.google.com/?q=' + mapQuery;
    }
  }

  /**
   * Render contact section
   * @param {Object} data - Contact data from contact.yml
   */
  function renderContact(data) {
    // Update phone
    var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
      if (data.phone) {
        var phoneNumber = data.phone.replace(/[^0-9+]/g, '');
        link.href = 'tel:' + phoneNumber;
        if (link.classList.contains('contact-link--phone')) {
          link.textContent = data.phone;
        }
      }
    });

    // Update email
    var emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(function(link) {
      if (data.email) {
        link.href = 'mailto:' + data.email;
        if (link.classList.contains('contact-link--email')) {
          link.textContent = data.email;
        }
      }
    });

    // Update Facebook
    var fbLink = document.querySelector('.contact-link--social');
    if (fbLink && data.facebook) {
      fbLink.href = data.facebook;
    }
  }

  /**
   * Render food menu section
   * @param {Object} data - Menu data from menu.yml
   */
  function renderMenu(data) {
    var menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;

    var categories = [
      { key: 'produce', title: 'Produce' },
      { key: 'proteins', title: 'Proteins' },
      { key: 'grains_dairy', title: 'Grains & Dairy' },
      { key: 'pantry', title: 'Pantry Staples' }
    ];

    menuGrid.innerHTML = categories.map(function(cat) {
      var items = data[cat.key] || [];
      return '<div class="menu-card">' +
        '<h3>' + escapeHTML(cat.title) + '</h3>' +
        '<ul class="menu-list">' +
        items.map(function(item) {
          return '<li>' + escapeHTML(item) + '</li>';
        }).join('') +
        '</ul>' +
        '</div>';
    }).join('');
  }

  /**
   * Render needs section
   * @param {Object} data - Needs data from needs.yml
   */
  function renderNeeds(data) {
    var needsGrid = document.querySelector('.needs-grid');
    if (!needsGrid) return;

    var categories = [
      { key: 'most_needed', title: 'Most Needed Items', className: 'needs-card needs-card--urgent' },
      { key: 'always_welcome', title: 'Always Welcome', className: 'needs-card' },
      { key: 'non_food', title: 'Non-Food Items', className: 'needs-card' }
    ];

    needsGrid.innerHTML = categories.map(function(cat) {
      var items = data[cat.key] || [];
      return '<div class="' + cat.className + '">' +
        '<h3>' + escapeHTML(cat.title) + '</h3>' +
        '<ul class="needs-list">' +
        items.map(function(item) {
          return '<li>' + escapeHTML(item) + '</li>';
        }).join('') +
        '</ul>' +
        '</div>';
    }).join('');
  }

  /**
   * Escape HTML special characters
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
   * Load all content from YAML files
   */
  async function loadContent() {
    try {
      // Load all data files in parallel
      var results = await Promise.allSettled([
        fetchYAML('hours.yml'),
        fetchYAML('contact.yml'),
        fetchYAML('menu.yml'),
        fetchYAML('needs.yml')
      ]);

      // Render each section if its data loaded successfully
      if (results[0].status === 'fulfilled') {
        renderHours(results[0].value);
        renderLocation(results[0].value);
        renderClosures(results[0].value);
      }

      if (results[1].status === 'fulfilled') {
        renderContact(results[1].value);
      }

      if (results[2].status === 'fulfilled') {
        renderMenu(results[2].value);
      }

      if (results[3].status === 'fulfilled') {
        renderNeeds(results[3].value);
      }

    } catch (error) {
      // Silent fail - hardcoded content remains
      console.warn('Content loading failed:', error);
    }
  }

  // Load content when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }

})();
