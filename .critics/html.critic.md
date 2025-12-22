# HTML Critic

Review HTML changes for best practices and valid structure.

## Context

The website should use semantic HTML5, be valid, and follow modern best practices for maintainability and SEO.

## Check

When reviewing changes:

1. **Document Structure**
   - `<!DOCTYPE html>` declaration present
   - `<html lang="en">` attribute set
   - `<head>` contains required meta tags
   - Single `<main>` element

2. **Required Meta Tags**
   - `<meta charset="UTF-8">`
   - `<meta name="viewport" content="width=device-width, initial-scale=1">`
   - `<title>` with descriptive content
   - `<meta name="description">` for SEO

3. **Semantic Elements**
   - Use `<header>`, `<nav>`, `<main>`, `<footer>` appropriately
   - Use `<article>`, `<section>`, `<aside>` for content structure
   - Avoid divitis (excessive `<div>` nesting)

4. **Heading Hierarchy**
   - Single `<h1>` per page
   - Headings don't skip levels (h1 -> h2 -> h3)
   - Headings describe content sections

5. **Links and Resources**
   - External links have `rel="noopener"` when using `target="_blank"`
   - CSS/JS paths are correct
   - Images exist at referenced paths

## Output

Respond with JSON:
```json
{
  "pass": boolean,
  "issues": ["list of HTML issues"],
  "severity": "critical" | "warning" | "info",
  "suggestions": ["how to fix each issue"]
}
```

## Examples

### FAIL - Missing Language
```html
<!DOCTYPE html>
<html>
```
Issue: html element missing lang attribute

### FAIL - Skipped Heading Level
```html
<h1>Welcome</h1>
<h3>Our Services</h3>
```
Issue: Heading level skipped (h1 to h3)

### PASS - Proper Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Laingsburg Area Food Bank</title>
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>
```
