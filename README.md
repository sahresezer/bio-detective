# Bio Detective - Advanced Scientific Article Analysis Plugin

**Version:** 1.1.0  
**Requires WordPress:** 5.0+  
**Requires PHP:** 7.4+  
**License:** GPL v2 or later  
**GitHub:** https://github.com/sahresezer/bio-detective

---

## 📋 Table of Contents

- [Description](#description)
- [✨ Key Features](#-key-features)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🎨 Divi Integration](#-divi-integration)
- [🔧 Configuration](#-configuration)
- [📚 Usage Examples](#-usage-examples)
- [🔬 Free Premium Bioinformatics Analysis](#-free-premium-bioinformatics-analysis)
- [🛠️ API Reference](#️-api-reference)
- [🏗️ Development](#️-development)
- [🔍 Troubleshooting](#-troubleshooting)
- [📊 Compatibility](#-compatibility)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Credits](#-credits)

---

## Description

**Bio Detective** is a revolutionary WordPress plugin that brings advanced bioinformatics analysis to scientific content creators. Powered by Biyonaz AI guidance, it automatically analyzes scientific articles to detect genes, p-values, experimental techniques, model organisms, and public datasets - all **completely free**!

The plugin seamlessly integrates with the Divi page builder, making it perfect for research institutions, bioinformatics professionals, and scientific bloggers who want to provide premium analysis tools to their audience without any cost.

---

## ✨ Key Features

### 🔬 **Advanced Analysis Engine**
- **Gene Detection**: Identifies gene symbols and protein names with NCBI database integration
- **Statistical Analysis**: Extracts and highlights p-values and statistical significance markers
- **Experimental Techniques**: Recognizes 7+ major bioinformatics methods (RNA-seq, ChIP-seq, CRISPR, GWAS, etc.)
- **Model Organisms**: Detects commonly used species (Human, Mouse, Yeast, Zebrafish)
- **Public Datasets**: Links to GEO, SRA, and TCGA repositories

### 🎨 **Seamless Integration**
- **Full Divi Compatibility**: Native module for Divi page builder
- **Shortcode Support**: Works with any WordPress theme
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: WCAG 2.1 compliant

### 🔧 **Developer-Friendly**
- **REST API**: Programmatic access for custom integrations
- **React Components**: Modern frontend architecture
- **Webpack Build**: Optimized production builds
- **Fallback Analysis**: Works offline with local processing

---

## 🚀 Quick Start

1. **Install Plugin**: Upload to `/wp-content/plugins/` and activate
2. **Add to Page**: Use Divi module or `[bio_detective_article]` shortcode
3. **Analyze Content**: Paste scientific text and click "Analyze"
4. **Get Insights**: Receive free premium bioinformatics analysis instantly!

---

## 📦 Installation

### Method 1: WordPress Admin (Recommended)

1. Download the plugin ZIP from [GitHub Releases](https://github.com/sahresezer/bio-detective/releases)
2. Go to **WordPress Admin** → **Plugins** → **Add New**
3. Click **Upload Plugin** and select the ZIP file
4. Click **Install Now** then **Activate**

### Method 2: Manual Upload

1. Download and extract the plugin files
2. Upload the `bio-detective` folder to `/wp-content/plugins/`
3. Go to **Plugins** → **Bio Detective** → **Activate**

### Method 3: Git Clone (Developers)

```bash
cd wp-content/plugins/
git clone https://github.com/sahresezer/bio-detective.git
cd bio-detective
npm install
npm run build
# Then activate in WordPress admin
```

### Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.4 or higher
- **Divi Theme/Plugin**: For full page builder integration (optional)
- **Node.js**: 14+ (for development builds)

---

## 🎨 Divi Integration

### Adding the Module

1. **Edit any page** with Divi Builder
2. **Click "Add New Module"**
3. **Search for**: "Bio Detective Article Scan"
4. **Configure settings** (optional):
   - Module Title
   - Enable Biyonaz AI
   - Link to NCBI
   - Button Color
   - Text Alignment

### Module Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Module Title** | Header text for the module | "Article Detective" |
| **Description** | Custom description text | "Analyze scientific articles..." |
| **Show Gene Links** | Enable gene database links | On |
| **Button Color** | Customize analyze button | #e91e63 |
| **Text Alignment** | Left, center, or right | Left |

---

## 🔧 Configuration

### Basic Setup

After activation, the plugin works out-of-the-box. No additional configuration required!

### Advanced Settings (Future Release)

- **Analysis Sensitivity**: Adjust detection thresholds
- **Custom Keywords**: Add domain-specific terms
- **Export Formats**: Configure download options
- **API Rate Limits**: Control analysis frequency

---

## 📚 Usage Examples

### Basic Gene Analysis

**Input Text:**
```
We analyzed TP53 and BRCA1 expression in human samples using RNA-seq.
The results showed p < 0.05 for both genes.
```

**Output:**
- 🧬 **Detected Genes**: [TP53](https://www.ncbi.nlm.nih.gov/gene/?term=TP53), [BRCA1](https://www.ncbi.nlm.nih.gov/gene/?term=BRCA1)
- 📊 **P-values**: p < 0.05
- 🔬 **Technique**: RNA-seq
- 🧑 **Species**: Human
- 📈 **Insight Score**: 75/100

### Advanced Multi-Technique Analysis

**Input Text:**
```
Our GWAS study identified 15 SNPs associated with disease risk (p = 0.001).
We validated these findings using qPCR in mouse models and deposited
the raw data in GEO (GSE123456).
```

**Output:**
- 🧬 **Detected Genes**: 15 SNPs
- 📊 **P-values**: p = 0.001
- 🔬 **Techniques**: GWAS, qPCR
- 🐭 **Species**: Mouse
- 📊 **Datasets**: GEO (GSE123456)
- 📈 **Insight Score**: 95/100

### Programmatic Usage

```javascript
// REST API Example
fetch('/wp-json/bio-detective/v1/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': wpApiSettings.nonce
  },
  body: JSON.stringify({
    text: 'Your scientific article text here...'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Genes:', data.genes);
  console.log('Insight Score:', data.insight.score);
});
```

---

## 🔬 Free Premium Bioinformatics Analysis

### What You Get (Completely Free!)

| Feature | Description | Example Output |
|---------|-------------|----------------|
| **Gene Detection** | NCBI-linked gene symbols | 🧬 TP53, BRCA1, MTOR |
| **Statistical Markers** | P-values and significance | 📊 p < 0.05, p = 0.001 |
| **Experimental Methods** | 7+ technique recognition | 🔬 RNA-seq, ChIP-seq, CRISPR |
| **Model Organisms** | Species identification | 🧑 Human, 🐭 Mouse, 🧫 Yeast |
| **Public Datasets** | Repository linking | 📊 GEO, SRA, TCGA |
| **Quality Scoring** | 0-100 research assessment | 📈 Score: 85/100 |
| **AI Summaries** | Contextual feedback | 💡 "Strong bioinformatics signal detected" |

### Scoring Algorithm

```
Base Score: 20 points
+ Gene Detection: 5 points each
+ P-value Detection: 10 points each
+ Technique Recognition: 15 points each
+ Dataset References: 10 points each
= Maximum: 100 points
```

### Score Interpretation

- **0-30**: Light experimental detail - needs more context
- **31-65**: Solid foundation - some strengthening needed
- **66-100**: Excellent bioinformatics signal - high-quality analysis

---

## 🛠️ API Reference

### REST Endpoints

#### `POST /wp-json/bio-detective/v1/analyze`

Analyze scientific text and return bioinformatics insights.

**Request:**
```json
{
  "text": "Scientific article text to analyze..."
}
```

**Response:**
```json
{
  "genes": ["TP53", "BRCA1"],
  "pvalues": ["p < 0.05", "p = 0.001"],
  "insight": {
    "score": 85,
    "summary": "Excellent bioinformatics signal detected...",
    "techniques": ["RNA-seq", "qPCR"],
    "species": ["Human", "Mouse"],
    "datasets": ["GEO"]
  },
  "timestamp": "2026-04-17 12:00:00"
}
```

**Headers Required:**
```
Content-Type: application/json
X-WP-Nonce: [WordPress nonce]
```

### JavaScript Integration

```javascript
// Direct component usage
import ArticleDetective from './src/ArticleDetectiveModule';

// With WordPress localization
const settings = window.BioDective || {};
```

---

## 🏗️ Development

### Project Structure

```
bio-detective/
├── 📁 includes/modules/ArticleDetective/
│   ├── ArticleDetectiveModule.jsx    # React component
│   ├── ArticleDetectiveModule.php    # Divi registration
│   └── style.css                     # Component styles
├── 📁 src/
│   ├── ArticleDetectiveModule.jsx    # Source component
│   └── index.js                      # Entry point
├── 📁 dist/
│   ├── article-detective.min.js      # Production build
│   └── article-detective.min.js.map  # Source map
├── 📄 bio-detective.php              # Main plugin file
├── 📄 package.json                   # Dependencies
├── 📄 webpack.config.js              # Build configuration
└── 📄 README.md                      # This file
```

### Build Commands

```bash
# Install dependencies
npm install

# Development build with watch
npm run dev

# Production build
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

### Development Setup

1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Make changes** to `src/` files
5. **Build for production**: `npm run build`
6. **Test in WordPress** environment

---

## 🔍 Troubleshooting

### Common Issues

#### "Bio Detective module not showing in Divi"
**Solution:**
- Ensure Divi theme/plugin is active
- Clear WordPress cache
- Check browser console for JavaScript errors
- Verify plugin is activated

#### "Analysis not working"
**Solution:**
- Check `dist/article-detective.min.js` exists
- Verify React is loaded by WordPress
- Check browser network tab for failed requests
- Ensure REST API is accessible

#### "403 Forbidden on API calls"
**Solution:**
- Verify WordPress nonces are included
- Check user permissions
- Ensure `current_user_can('read')` passes

#### "Build failing"
**Solution:**
- Run `npm install` to update dependencies
- Check Node.js version (14+ required)
- Clear node_modules and reinstall
- Check webpack configuration

### Debug Mode

Enable WordPress debug mode in `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

Check `/wp-content/debug.log` for detailed error messages.

---

## 📊 Compatibility

### ✅ Tested Environments

| Component | Version | Status |
|-----------|---------|--------|
| **WordPress** | 5.0 - 6.4 | ✅ Fully Compatible |
| **PHP** | 7.4 - 8.2 | ✅ Fully Compatible |
| **Divi Theme** | 4.0+ | ✅ Native Integration |
| **Divi Builder Plugin** | 4.0+ | ✅ Native Integration |
| **Chrome** | 90+ | ✅ Tested |
| **Firefox** | 88+ | ✅ Tested |
| **Safari** | 14+ | ✅ Tested |
| **Edge** | 90+ | ✅ Tested |

### 🔄 Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation
- **Mobile Browsers**: Responsive design
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### Ways to Contribute

1. **🐛 Bug Reports**: Use [GitHub Issues](https://github.com/sahresezer/bio-detective/issues)
2. **💡 Feature Requests**: Suggest new bioinformatics analysis features
3. **🔧 Code Contributions**: Submit pull requests
4. **📖 Documentation**: Improve this README or add tutorials
5. **🧪 Testing**: Help test new features and report issues

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Make changes** and test thoroughly
4. **Submit** a pull request with detailed description
5. **Wait** for review and merge

### Code Standards

- **PHP**: PSR-12 coding standards
- **JavaScript**: ESLint configuration
- **CSS**: Follow component-based architecture
- **Git**: Conventional commit messages

---

## 📄 License

This plugin is licensed under the **GNU General Public License v2.0 or later**.

```
Bio Detective - Advanced Scientific Article Analysis Plugin
Copyright (C) 2026 Open Source Community

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

---

## 🙏 Credits

### Core Team
- **Open Source Community**: React, WordPress, and bioinformatics tools

### Acknowledgments
- **NCBI**: Gene database integration
- **GEO/SRA/TCGA**: Public dataset repositories
- **WordPress Community**: Plugin architecture and best practices
- **Divi Team**: Page builder integration support

### Special Thanks
To all researchers and bioinformatics professionals who inspired this project by making scientific analysis accessible to everyone.

---

## 📞 Support

### Getting Help

- **📧 Email**: sahrehilalsezer@gmail.com
- **🐛 Issues**: [GitHub Issues](https://github.com/sahresezer/bio-detective/issues)
- **💬 Community**: [WordPress Forums](https://wordpress.org/support/plugin/bio-detective/)

### Feature Requests

Have an idea for new bioinformatics analysis features? We'd love to hear it!

1. Check existing [issues](https://github.com/sahresezer/bio-detective/issues) first
2. Create a new issue with the "enhancement" label
3. Describe your use case and expected behavior
4. We'll review and prioritize community requests

---

## 🔄 Changelog

### Version 1.1.0 (April 17, 2026)
- ✨ **Enhanced Divi Integration**: Improved module settings and responsiveness
- 🔧 **REST API**: Programmatic access for developers
- 📱 **Mobile Optimization**: Better responsive design
- 🐛 **Bug Fixes**: Various stability improvements

### Version 1.0.0 (Initial Release)
- 🧬 Gene detection with NCBI integration
- 📊 P-value extraction
- 🎨 Divi compatibility
- 📱 Responsive interface

---

**Made with ❤️ for the global bioinformatics community**

*Transforming scientific content analysis, one article at a time.* 🔬✨