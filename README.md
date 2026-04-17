# Bio Detective - Scientific Article Analysis Plugin

**Version:** 1.0.0  
**Requires WordPress:** 5.0+  
**Requires PHP:** 7.4+  
**License:** GPL v2 or later

## Description

Bio Detective is an advanced WordPress plugin that leverages AI-powered Biyonaz guidance to analyze scientific articles. The plugin automatically detects genes, p-values, and molecular entities within scientific texts, providing contextual feedback and NCBI integration.

### Features

- **🧬 Gene Detection**: Automatically identify gene symbols and protein names
- **📊 Statistical Analysis**: Extract and highlight p-values and statistical significance
- **🤖 Biyonaz AI Guidance**: Real-time contextual feedback from Biyonaz AI assistant
- **🔗 NCBI Integration**: Direct links to gene database searches
- **📥 Export Functionality**: Download analysis reports as text files
- **🎨 Divi Compatibility**: Full integration with Divi page builder
- **📱 Responsive Design**: Mobile-friendly interface
- **♿ Accessible**: WCAG 2.1 compliant UI

## Installation

1. Download the plugin folder to `/wp-content/plugins/`
2. Activate the plugin from WordPress admin panel
3. If using Divi, the Article Detective module will appear in your module list
4. Insert the module into your Divi pages

## File Structure

```
bio-detective-plugin/
├── includes/
│   └── modules/
│       └── ArticleDetective/
│           ├── ArticleDetectiveModule.jsx  # React component (Phase 4)
│           ├── ArticleDetectiveModule.php  # Divi module registration
│           └── style.css                   # Complete styling & animations
├── assets/
│   └── images/
│       └── biyonaz-avatar.png              # Biyonaz avatar image
├── languages/                              # i18n translation files
├── README.md
├── package.json
├── .gitignore
└── bio-detective.php                       # Main plugin file
```

## Component Details

### ArticleDetectiveModule.jsx
React component featuring:
- Biyonaz AI guidance box with mood states (neutral, happy, warning, searching)
- Textarea for article input
- Real-time analysis button
- Gene chip display with NCBI links
- P-value statistical markers

### ArticleDetectiveModule.php
WordPress/Divi integration:
- Divi module registration
- Settings panel configuration
- Customizable colors and options
- REST API endpoint

### style.css
Complete styling system:
- Component layouts and responsive design
- Biyonaz mood-based styling
- Animations (fade-in, slide-down, pulse)
- Dark mode support
- Accessibility features

## Usage

### In Divi
1. Edit a page with Divi
2. Add a new module
3. Search for "Bio Detective Article Scan"
4. Configure options (title, enable AI, link to NCBI, button color)
5. Publish

### Settings
- **Module Title**: Customize header text
- **Description**: Add custom description
- **Enable Biyonaz AI**: Toggle AI guidance on/off
- **Link to NCBI**: Enable/disable external gene database links
- **Button Color**: Customize analyze button color

## API Reference

### REST Endpoint: POST `/wp-json/bio-detective/v1/analyze`

**Parameters:**
```json
{
  "text": "scientific article text here..."
}
```

**Response:**
```json
{
  "genes": ["TP53", "BRCA1", "MTOR"],
  "pvalues": ["p < 0.05", "p = 0.001"],
  "timestamp": "2026-04-17 12:00:00"
}
```

## Styling Variables

The component uses CSS custom properties for easy customization:

```css
/* Brand Colors */
--color-primary: #e91e63;     /* Main brand color */
--color-success: #4caf50;     /* Happy mood */
--color-warning: #ff9800;     /* Warning mood */
--color-info: #2196f3;        /* Searching mood */

/* Spacing */
--spacing-xs: 5px;
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 30px;
```

## Development

### Building from Source
```bash
npm install
npm run build      # Build for production
npm run dev        # Development watch mode
npm run lint       # Run ESLint
```

### Testing
```bash
npm run test       # Run Jest tests
npm run test:coverage  # Generate coverage report
```

## Compatibility

- ✅ WordPress 5.0+
- ✅ Divi Theme & Plugin
- ✅ PHP 7.4+
- ✅ React 16.8+
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)

## Security

- Sanitizes all input text
- Checks user permissions via REST API
- Uses WordPress nonces for CSRF protection
- Follows WordPress security best practices

## Support

For issues, feature requests, or documentation:
- **Documentation**: https://bioinforange.com/bio-detective-docs
- **Support Email**: support@bioinforange.com
- **GitHub Issues**: https://github.com/bioinforange/bio-detective

## Credits

**Developed by:** BioInfoRange Team  
**Biyonaz AI:** AI guidance system  
**Designed for:** Scientific community & bioinformatics professionals

## License

This plugin is licensed under the GNU General Public License v2 or later. See LICENSE file for details.

## Changelog

### Version 1.0.0 - April 17, 2026
- Initial release
- Biyonaz AI guidance system
- Gene and p-value detection
- NCBI database integration
- Full Divi compatibility
- Responsive design
- Accessibility improvements

---

**Made with ❤️ by the BioInfoRange Team**
