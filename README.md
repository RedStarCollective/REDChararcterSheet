# Cyberpunk RED Character Sheet

An interactive, web-based character sheet for Cyberpunk RED TRPG. Features a dark mode design with red accents and the Rajdhani font for that authentic cyberpunk aesthetic.

## Features

- **Interactive Calculations**: Automatic skill modifier and base calculations based on stats and levels
- **Auto-Save**: Character data automatically saves to browser localStorage
- **Portrait Upload**: Upload and display your character portrait
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode**: Cyberpunk-themed dark interface with red accents
- **Dynamic Content**: Add/remove weapons, armor, and vehicles as needed
- **Keyboard Shortcuts**: Quick save with Ctrl/Cmd + S

## How to Use

### Basic Setup

1. Open `index.html` in a web browser
2. Fill in your character information:
   - Handle (character name)
   - Role (Rockerboy, Solo, Netrunner, etc.)
   - Upload a character portrait

### Stats and Skills

- **Core Stats**: Adjust INT, REF, DEX, TECH, COOL, WILL, LUCK, MOVE, BODY, and EMP
- **Skills**: Enter skill levels (0-10) and watch modifiers calculate automatically
- **Skill Formula**: Base = STAT + (Level × 2)

### Humanity and Empathy

- Adjust Humanity (max 100)
- EMP automatically calculates as Humanity ÷ 10

### Combat Stats

- **Hit Points**: Set current and maximum HP
- **Seriously Wounded**: Automatically calculated at 50% of max HP
- **Death Save**: Based on BODY stat

### Equipment

- **Weapons**: Add weapons with damage and ROF stats
- **Armor**: Track armor pieces with SP and penalty values
- **Vehicles**: Manage vehicles with SDP, SP, and speed

### Data Management

#### Auto-Save
Character data automatically saves to your browser's localStorage whenever you make changes.

#### Manual Save
Press `Ctrl + S` (Windows/Linux) or `Cmd + S` (Mac) for manual save confirmation.

#### Export/Import
- Use `exportCharacter()` in browser console to download character as JSON
- Use `importCharacter(file)` in browser console to load a saved character
- Use `resetCharacter()` to clear all data and start fresh

## Technical Details

### Files

- `index.html` - Main character sheet structure
- `styles.css` - Dark mode cyberpunk styling
- `script.js` - Interactive functionality and calculations

### Dependencies

- **Google Fonts**: Rajdhani font family (loaded from CDN)
- No other external dependencies required

### Browser Compatibility

- Chrome/Edge: ✓ Fully supported
- Firefox: ✓ Fully supported
- Safari: ✓ Fully supported
- Modern browsers with ES6 support recommended

### Data Storage

Character data is stored locally in the browser using localStorage. Data persists between sessions but is specific to each browser/device.

## Customization

### Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-bg: #0a0a0a;      /* Main background */
    --secondary-bg: #1a1a1a;    /* Section backgrounds */
    --accent-red: #ff0040;       /* Primary accent color */
    --text-primary: #ffffff;     /* Main text color */
}
```

### Font

Change the font by updating the Google Fonts import in `index.html` and the `font-family` in `styles.css`.

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Access at `https://yourusername.github.io/repository-name/`

### Local Server

```bash
# Simple HTTP server with Python
python -m http.server 8000

# Or with Node.js
npx http-server
```

### Static Hosting

Upload all files to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3

## Credits

- **Game System**: Cyberpunk RED by R. Talsorian Games
- **Design**: Inspired by Cyberpunk RED official materials
- **Font**: Rajdhani by Indian Type Foundry

## License

This is a fan-made tool for personal use. Cyberpunk RED is © R. Talsorian Games.

## Support

For issues or suggestions, please open an issue on the GitHub repository.
