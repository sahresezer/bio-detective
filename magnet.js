import React, { useState } from 'react';

/**
 * ArticleDetective Component - Phase 2
 * Feature: Smart-Linking to Bioinformatics Databases (NCBI / UniProt)
 */
const ArticleDetective = () => {
  const [articleText, setArticleText] = useState('');
  const [results, setResults] = useState({
    detectedGenes: [],
    significantValues: [],
    analysisDate: ''
  });

  const performAnalysis = () => {
    // Regex for Gene Symbols (e.g., TP53, BRCA1, MTOR)
    const genePattern = /\b[A-Z][A-Z0-9]{2,8}\b/g;
    const pValuePattern = /p\s*[<>=]\s*[0-9.]+/gi;

    const uniqueGenes = [...new Set(articleText.match(genePattern) || [])];
    const pValues = articleText.match(pValuePattern) || [];

    setResults({
      detectedGenes: uniqueGenes,
      significantValues: pValues,
      analysisDate: new Date().toLocaleString()
    });
  };

  // Helper function to create NCBI Search Link
  const getNCBILink = (gene) => `https://www.ncbi.nlm.nih.gov/gene/?term=${gene}`;

  const handleDownloadTxt = () => {
    const reportContent = 
      `ARTICLE DETECTIVE ANALYSIS REPORT\n` +
      `--------------------------------------------------\n` +
      `Date: ${results.analysisDate}\n\n` +
      `DETECTED GENES:\n${results.detectedGenes.join(', ')}\n\n` +
      `P-VALUES:\n${results.significantValues.join(' | ')}\n` +
      `--------------------------------------------------`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bio_Analysis_${Date.now()}.txt`;
    link.click();
  };

  return (
    <div className="article-detective-v2" style={styles.container}>
      <h2 style={styles.header}>🕵️‍♀️ Article Detective v2.0</h2>
      
      <textarea 
        style={styles.textarea}
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Paste your abstract or methodology here..."
      />

      <div style={styles.buttonGroup}>
        <button onClick={performAnalysis} style={styles.analyzeBtn}>Analyze Data</button>
        {results.detectedGenes.length > 0 && (
          <button onClick={handleDownloadTxt} style={styles.downloadBtn}>Export TXT</button>
        )}
      </div>

      {results.detectedGenes.length > 0 && (
        <div style={styles.resultsArea}>
          <h3 style={styles.subHeader}>Detected Entities (Click to Search NCBI):</h3>
          <div style={styles.chipContainer}>
            {results.detectedGenes.map((gene, index) => (
              <a 
                key={index} 
                href={getNCBILink(gene)} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.geneChip}
                title={`Search ${gene} on NCBI`}
              >
                🧬 {gene}
              </a>
            ))}
          </div>

          <h3 style={styles.subHeader}>Statistical Markers:</h3>
          <div style={styles.pValueList}>
            {results.significantValues.map((val, idx) => (
              <span key={idx} style={styles.pValueTag}>{val}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Updated Styles for Phase 2
const styles = {
  container: { padding: '25px', borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' },
  header: { color: '#2c3e50', borderBottom: '2px solid #6200ee', display: 'inline-block', marginBottom: '20px' },
  textarea: { width: '100%', height: '150px', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' },
  buttonGroup: { marginTop: '15px', display: 'flex', gap: '10px' },
  analyzeBtn: { backgroundColor: '#6200ee', color: '#fff', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  downloadBtn: { backgroundColor: '#f1f2f6', color: '#2f3542', padding: '12px 20px', borderRadius: '8px', border: '1px solid #ced4da', cursor: 'pointer' },
  resultsArea: { marginTop: '30px', animation: 'fadeIn 0.5s' },
  subHeader: { fontSize: '16px', color: '#7f8c8d', marginBottom: '10px' },
  chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' },
  geneChip: { 
    textDecoration: 'none', backgroundColor: '#e8f0fe', color: '#1a73e8', padding: '6px 12px', 
    borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid #d2e3fc', transition: '0.3s'
  },
  pValueList: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  pValueTag: { backgroundColor: '#fff3e0', color: '#e65100', padding: '4px 10px', borderRadius: '5px', fontSize: '13px', border: '1px solid #ffe0b2' }
};

export default ArticleDetective;