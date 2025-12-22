# Test Website

Check HTML validity and basic functionality.

## Quick Checks

```bash
# Check HTML syntax
if [ -f "src/index.html" ]; then
    echo "Checking HTML..."
    # Check for common issues
    grep -c "<!DOCTYPE html>" src/index.html && echo "DOCTYPE: OK" || echo "DOCTYPE: Missing!"
    grep -c "<html lang=" src/index.html && echo "Language attr: OK" || echo "Language attr: Missing!"
    grep -c "<title>" src/index.html && echo "Title tag: OK" || echo "Title tag: Missing!"
    grep -c "<meta charset=" src/index.html && echo "Charset: OK" || echo "Charset: Missing!"
    grep -c "viewport" src/index.html && echo "Viewport: OK" || echo "Viewport: Missing!"
fi
```

## Manual Testing

1. **Open in browser:**
```bash
open src/index.html
```

2. **Check mobile view:**
   - Use browser dev tools (Cmd+Opt+I)
   - Toggle device toolbar (Cmd+Shift+M)
   - Test on iPhone SE, iPad, desktop sizes

3. **Accessibility check:**
   - Tab through the page - can you reach everything?
   - Use screen reader (Cmd+F5 on Mac)
   - Check color contrast

## Online Validators

- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/
- Accessibility: https://wave.webaim.org/
