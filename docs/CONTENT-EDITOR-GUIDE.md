# Content Editor Guide

This guide explains how to update website content for the Laingsburg Area Food Bank website using Google Sheets.

## Quick Reference

| What to Update | Sheet Tab |
|----------------|-----------|
| Urgent announcements (snow days, etc.) | `alerts` |
| Hours of operation | `hours` |
| Holiday closures | `closures` |
| Address/location | `location` |
| Phone/email/Facebook | `contact` |
| Available food items | `menu` |
| Items we need | `needs` |
| FAQ questions | `faq` |
| About Us text | `about` |
| Services we offer | `services` |
| Volunteer opportunities | `volunteers` |

---

## Accessing the Content Sheet

1. Open the Google Sheet (bookmark this link): `[SHEET_URL_HERE]`
2. You'll see tabs at the bottom for each content section
3. Edit the cells directly - changes go live within 5 minutes

---

## Tab-by-Tab Instructions

### Alerts Tab (Announcements)

Use this for time-sensitive announcements like snow closures, special events, or urgent notices.

| Column | What to Enter | Example |
|--------|---------------|---------|
| active | TRUE or FALSE | TRUE |
| type | info, warning, or urgent | warning |
| title | Short headline | Snow Day Closure |
| message | The full message | Closed today due to weather. Stay safe! |
| link_text | Optional button text | Learn more |
| link_url | Optional link | #hours |
| start_date | Optional: when to start showing | 2025-01-15 |
| end_date | Optional: when to stop showing | 2025-01-16 |

**Alert Types:**
- `info` - Blue background (general announcements)
- `warning` - Orange background (important notices)
- `urgent` - Red background (emergencies, closures)

**To remove an alert:** Set `active` to FALSE (or delete the row).

---

### Hours Tab

Each row is one day the food bank is open.

| Column | What to Enter | Example |
|--------|---------------|---------|
| day | Day of the week | Monday |
| open | Opening time | 1:00 PM |
| close | Closing time | 3:00 PM |

---

### Closures Tab

List all holiday closures for the year.

| Column | What to Enter | Example |
|--------|---------------|---------|
| date | Date or date range | Dec 25 |
| name | Holiday name | Christmas |

---

### Location Tab

Single row with the food bank address.

| Column | What to Enter | Example |
|--------|---------------|---------|
| name | Building name | Laingsburg United Methodist Church |
| street | Street address | 210 North Crum Street |
| city | City | Laingsburg |
| state | State abbreviation | MI |
| zip | ZIP code | 48848 |

---

### Contact Tab

Single row with contact information.

| Column | What to Enter | Example |
|--------|---------------|---------|
| phone | Phone number | (517) 651-5531 |
| email | Email address | laingsburgumc@gmail.com |
| facebook | Full Facebook URL | https://www.facebook.com/laingsburgareafoodbank |

---

### Menu Tab

Food items currently available. Each row is one item.

| Column | What to Enter | Example |
|--------|---------------|---------|
| category | produce, proteins, grains_dairy, or pantry | produce |
| item | Food item description | Fresh fruits (seasonal) |

**Categories:**
- `produce` - Fresh and canned fruits/vegetables
- `proteins` - Meats, beans, peanut butter, eggs
- `grains_dairy` - Bread, pasta, cereal, milk
- `pantry` - Soups, boxed meals, cooking supplies

---

### Needs Tab

Donation items needed. Each row is one item.

| Column | What to Enter | Example |
|--------|---------------|---------|
| priority | most_needed, always_welcome, or non_food | most_needed |
| item | Item description | Canned proteins (tuna, chicken) |

**Priorities:**
- `most_needed` - Shows with orange "Most Needed" label
- `always_welcome` - Regular staples
- `non_food` - Toiletries, paper products, etc.

---

### FAQ Tab

Frequently asked questions. Each row is one Q&A pair.

| Column | What to Enter | Example |
|--------|---------------|---------|
| order | Number for sorting (1, 2, 3...) | 1 |
| question | The question | Who can use the food bank? |
| answer | The answer | Anyone in the Laingsburg School District area... |

---

### About Tab

About Us section content. Three rows expected.

| Column | What to Enter | Example |
|--------|---------------|---------|
| section | mission, story, or service_area | mission |
| title | Section heading | Our Mission |
| content | Paragraph text | The Laingsburg Area Food Bank is dedicated to... |

---

### Services Tab

Services offered. Each row is one service card.

| Column | What to Enter | Example |
|--------|---------------|---------|
| order | Number for sorting | 1 |
| title | Service name | Food Distribution |
| description | Service description | Fresh produce, canned goods... |

---

### Volunteers Tab

Volunteer opportunities. Each row is one opportunity.

| Column | What to Enter | Example |
|--------|---------------|---------|
| order | Number for sorting | 1 |
| title | Role name | Food Distribution |
| description | Role description | Help sort donations, stock shelves... |

---

## Common Tasks

### Posting a Snow Day Closure

1. Go to the `alerts` tab
2. Add a new row:
   - active: TRUE
   - type: urgent
   - title: Snow Day Closure
   - message: Closed today due to inclement weather. Stay safe!
   - end_date: [today's date]
3. The alert will appear on the website within 5 minutes
4. After the snow day, set `active` to FALSE or delete the row

### Updating Hours Temporarily

For a temporary hour change:
1. Update the `hours` tab with the new times
2. Add an alert explaining the change
3. Remember to change back after the temporary period

### Adding a Seasonal Note

To note seasonal availability:
1. Go to the `menu` tab
2. Update item descriptions, e.g., "Fresh fruits (winter selection)"

---

## How It Works

- The website checks Google Sheets every 5 minutes for updates
- Your changes are cached, so visitors see fast page loads
- If Google Sheets is temporarily unavailable, the website shows the last cached content
- The website always has fallback content, so it never appears broken

---

## Troubleshooting

### Changes Not Appearing?

1. Wait 5 minutes (content is cached)
2. Hard refresh your browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check that the Sheet is still published (File > Share > Publish to web)

### Alert Not Showing?

- Make sure `active` is exactly `TRUE` (not "yes" or "1")
- Check the date range - current date must be between start_date and end_date
- Verify the `type` is one of: info, warning, urgent

### Wrong Category/Priority?

Make sure you're using the exact category names:
- Menu categories: `produce`, `proteins`, `grains_dairy`, `pantry`
- Needs priorities: `most_needed`, `always_welcome`, `non_food`
- About sections: `mission`, `story`, `service_area`

---

## Getting Help

If you need assistance:
- **Content questions**: Reach out to the food bank coordinator
- **Technical issues**: Contact the site administrator
- **Google Sheets help**: See [Google Sheets Help](https://support.google.com/docs/answer/6000292)
