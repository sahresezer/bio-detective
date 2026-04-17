import React, { useState, useEffect } from 'react';

/**
 * ArticleDetective Component
 * Phase 1: Text extraction, Pattern Recognition, and TXT Export.
 */
const ArticleDetective = () => {
  const [articleText, setArticleText] = useState('');
  const [results, setResults] = useState({
    detectedGenes: [],
    significantValues: [],
    analysisDate: ''
  });

  // Function to perform basic Bio-Entity Recognition using Regex
  const performAnalysis = () => {
    // Regex for Gene Symbols: Typically 3-8 uppercase letters/numbers (e.g., TP53, BRCA1)
    const genePattern = /\b[A-Z][A-Z0-9]{2,8}\b/g;
    
    // Regex for Statistical Significance (e.g., p < 0.05, p=0.001)
    const pValuePattern = /p\s*[<>=]\s*[0-9.]+/gi;

    const uniqueGenes = [...new Set(articleText.match(genePattern) || [])];
    const pValues = articleText.match(pValuePattern) || [];

    setResults({
      detectedGenes: uniqueGenes,
      significantValues: pValues,
      analysisDate: new Date().toLocaleString()
    });
  };

  // Function to generate and trigger the .txt file download
  const handleDownloadTxt = () => {
    const divider = "--------------------------------------------------\n";
    const reportContent = 
      `ARTICLE DETECTIVE ANALYSIS REPORT\n` +
      `${divider}` +
      `Date: ${results.analysisDate}\n` +
      `Source: Bioinforange Plugin\n` +
      `${divider}\n` +
      `1. DETECTED GENES / PROTEINS:\n` +
      `${results.detectedGenes.length > 0 ? results.detectedGenes.join(', ') : 'No entities detected.'}\n\n` +
      `2. STATISTICAL FINDINGS (P-VALUES):\n` +
      `${results.significantValues.length > 0 ? results.significantValues.join(' | ') : 'No significant values found.'}\n\n` +
      `${divider}` +
      `End of Report. Stay Curious, Detective!\n`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `Article_Analysis_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="article-detective-container" style={styles.container}>
      <h2 style={styles.header}>🕵️‍♀️ Article Detective Panel</h2>
      
      <p style={styles.label}>Paste Article Abstract or Full Text:</p>
      <textarea 
        style={styles.textarea}
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Enter scientific text here..."
      />

      <div style={styles.buttonGroup}>
        <button onClick={performAnalysis} style={styles.analyzeBtn}>
          Analyze Text
        </button>

        {results.detectedGenes.length > 0 && (
          <button onClick={handleDownloadTxt} style={styles.downloadBtn}>
            Download Report (.txt)
          </button>
        )}
      </div>

      {results.analysisDate && (
        <div style={styles.resultsArea}>
          <h3 style={styles.subHeader}>Analysis Results:</h3>
          <div style={styles.resultItem}>
            <strong>Genes Found:</strong> {results.detectedGenes.join(', ') || 'None'}
          </div>
          <div style={styles.resultItem}>
            <strong>P-Values:</strong> {results.significantValues.join(', ') || 'None'}
          </div>
        </div>
      )}
    </div>
  );
};

// Basic Styling Object (In Divi, you would use CSS or Styled Components)
const styles = {
  container: {
    padding: '25px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  header: { color: '#1a237e', marginBottom: '15px' },
  label: { fontSize: '14px', color: '#555' },
  textarea: {
    width: '100%',
    height: '180px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    lineHeight: '1.6',
    outline: 'none'
  },
  buttonGroup: { marginTop: '15px', display: 'flex', gap: '10px' },
  analyzeBtn: {
    backgroundColor: '#6200ee',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  downloadBtn: {
    backgroundColor: '#03dac6',
    color: '#000',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  resultsArea: {
    marginTop: '25px',
    paddingTop: '15px',
    borderTop: '2px solid #eee'
  },
  subHeader: { fontSize: '18px', color: '#333' },
  resultItem: { marginBottom: '10px', fontSize: '15px' }
};

export default ArticleDetective;