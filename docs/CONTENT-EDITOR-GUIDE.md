# Content Editor Guide

This guide explains how to update website content for the Laingsburg Area Food Bank website.

## Quick Reference

| What to Update | CMS Section | File (for direct editing) |
|----------------|-------------|---------------------------|
| Hours of operation | Site Settings > Hours & Location | `src/_data/hours.yml` |
| Address/location | Site Settings > Hours & Location | `src/_data/hours.yml` |
| Phone/email/Facebook | Site Settings > Contact Information | `src/_data/contact.yml` |
| Available food items | Food Menu | `src/_data/menu.yml` |
| Items we need | Current Needs | `src/_data/needs.yml` |

---

## Option 1: Using the CMS (Recommended)

The Content Management System (CMS) provides a user-friendly interface for editing content without touching code.

### Accessing the CMS

1. Go to: `https://[your-website]/admin/`
2. Log in with your Netlify Identity account
3. You'll see the content editor dashboard

### Editing Hours & Location

1. Click **Site Settings** in the left sidebar
2. Click **Hours & Location**
3. You'll see two sections:

**Operating Hours:**
- Each row has Day, Open Time, and Close Time
- Click the **+** button to add a new day
- Click the **X** next to a row to remove it
- Example: Day: "Saturday", Open: "9:00 AM", Close: "12:00 PM"

**Location:**
- Edit the address fields as needed
- All fields are required

4. Click **Publish** (top right) to save changes

### Editing Contact Information

1. Click **Site Settings** > **Contact Information**
2. Update any of these fields:
   - **Phone**: Format as (517) 555-1234
   - **Email**: The email address for inquiries
   - **Facebook URL**: Full URL like `https://www.facebook.com/yourpage`
3. Click **Publish** to save

### Editing the Food Menu

The food menu shows what's currently available for distribution.

1. Click **Food Menu** in the left sidebar
2. You'll see four categories:
   - **Produce**: Fresh and canned fruits/vegetables
   - **Proteins**: Meats, beans, peanut butter, eggs
   - **Grains & Dairy**: Bread, pasta, cereal, milk
   - **Pantry Staples**: Soups, boxed meals, cooking supplies

3. To add an item: Click the **+** button in that category
4. To remove an item: Click the **X** next to it
5. To reorder: Drag items up or down
6. Click **Publish** to save

### Editing Current Needs

The needs section shows what donations are most helpful.

1. Click **Current Needs** in the left sidebar
2. You'll see three categories:
   - **Most Needed Items**: High-priority donations
   - **Always Welcome**: Regular staples we always accept
   - **Non-Food Items**: Toiletries, paper products, etc.

3. Add, remove, or reorder items as needed
4. Click **Publish** to save

---

## Option 2: Direct File Editing

For quick edits or if the CMS is unavailable, you can edit files directly on GitHub.

### How to Edit Files on GitHub

1. Go to the repository on GitHub
2. Navigate to `src/_data/`
3. Click on the file you want to edit
4. Click the pencil icon (Edit this file)
5. Make your changes
6. Scroll down and click **Commit changes**
7. Add a brief description of what you changed
8. Click **Commit changes** again

### File Format (YAML)

Content files use YAML format. Key rules:
- **Indentation matters**: Use 2 spaces (not tabs)
- **Lists start with a dash**: `- Item name`
- **Quotes around special values**: Use quotes for times like `"1:00 PM"`

### Example: Updating Hours (hours.yml)

```yaml
hours:
  - day: Monday
    open: "1:00 PM"
    close: "3:00 PM"
  - day: Thursday
    open: "6:00 PM"
    close: "8:00 PM"
  - day: Saturday
    open: "9:00 AM"
    close: "11:00 AM"

location:
  name: Laingsburg United Methodist Church
  street: 210 Crum St
  city: Laingsburg
  state: MI
  zip: "48848"
```

### Example: Updating Contact (contact.yml)

```yaml
phone: "(517) 651-5531"
email: laingsburgumc@gmail.com
facebook: https://www.facebook.com/laingsburgareafoodbank
```

### Example: Updating Food Menu (menu.yml)

```yaml
produce:
  - Fresh fruits (seasonal)
  - Fresh vegetables
  - Canned fruits and vegetables

proteins:
  - Canned meats (tuna, chicken)
  - Peanut butter
  - Dried and canned beans

grains_dairy:
  - Bread and baked goods
  - Rice and pasta
  - Cereal and oatmeal

pantry:
  - Soups and stews
  - Boxed meals
  - Cooking oil
```

### Example: Updating Needs (needs.yml)

```yaml
most_needed:
  - Canned proteins (tuna, chicken, beans)
  - Peanut butter
  - Cereal

always_welcome:
  - Rice and dried beans
  - Canned soups and stews
  - Boxed meals (mac & cheese, etc.)

non_food:
  - Toiletries (soap, shampoo, toothpaste)
  - Paper products
  - Diapers and baby wipes
```

---

## Common Tasks

### Adding a New Distribution Day

1. Open Hours & Location (CMS) or `src/_data/hours.yml`
2. Add a new entry with day, open time, and close time
3. Publish/commit the change

### Updating for Seasonal Changes

When food availability changes seasonally:
1. Open the Food Menu
2. Update items in the Produce section (e.g., "Fresh fruits (winter selection)")
3. Add or remove items as inventory changes

### Highlighting Urgent Needs

Move your most urgent needs to the top of the "Most Needed Items" list. The first few items get the most visibility.

---

## Troubleshooting

### Changes Not Appearing

- Wait 2-3 minutes for the site to rebuild
- Try clearing your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you clicked "Publish" in the CMS

### CMS Login Issues

- Make sure you have a Netlify Identity account
- Check your email for a confirmation link if you're a new user
- Contact the site administrator if you can't access your account

### YAML Formatting Errors

If you edited a file directly and the site breaks:
- Check that all dashes line up vertically
- Make sure you used 2 spaces for indentation (not tabs)
- Ensure quotes are balanced (opening and closing)
- Look for missing colons after field names

---

## Getting Help

If you need assistance:
- **Technical issues**: Contact the site administrator
- **Content questions**: Reach out to the food bank coordinator
- **GitHub help**: See [GitHub's editing files guide](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
