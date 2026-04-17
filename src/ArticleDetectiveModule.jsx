import React, { useState } from 'react';

/**
 * ArticleDetective Component - Phase 4
 * Feature: Biyonaz AI Guidance & Contextual Feedback
 */
const ArticleDetective = () => {
  const [articleText, setArticleText] = useState('');
  const [results, setResults] = useState({
    detectedGenes: [],
    significantValues: [],
    analysisDate: ''
  });
  const [biyonazFeedback, setBiyonazFeedback] = useState({
    message: "I'm ready to help! Paste your text and let's start the investigation.",
    mood: 'neutral' // neutral, happy, warning, searching
  });

  const stopWords = ['DNA', 'RNA', 'PCR', 'ATP', 'PH', 'CELL', 'GENE', 'LAB', 'GEL', 'SDS'];

  const performAnalysis = () => {
    const genePattern = /\b[A-Z][A-Z0-9]{2,8}\b/g;
    const pValuePattern = /p\s*[<>=]\s*[0-9.]+/gi;

    const uniqueGenes = [...new Set(articleText.match(genePattern) || [])].filter(word => !stopWords.includes(word));
    const pValues = articleText.match(pValuePattern) || [];

    setResults({
      detectedGenes: uniqueGenes,
      significantValues: pValues,
      analysisDate: new Date().toLocaleString()
    });

    // --- Biyonaz Logic Engine ---
    updateBiyonaz(uniqueGenes, pValues);
  };

  const updateBiyonaz = (genes, pvals) => {
    if (genes.length === 0 && pvals.length === 0) {
      setBiyonazFeedback({
        message: "Hmm... Detective, this text seems empty of molecular data. Are you sure this is a scientific abstract?",
        mood: 'warning'
      });
    } else if (pvals.length === 0) {
      setBiyonazFeedback({
        message: "I found some genes, but where is the statistical proof? A true detective always looks for p-values!",
        mood: 'searching'
      });
    } else if (genes.length > 5) {
      setBiyonazFeedback({
        message: `Jackpot! I found ${genes.length} gene candidates. This paper seems to be high-throughput!`,
        mood: 'happy'
      });
    } else {
      setBiyonazFeedback({
        message: "Analysis complete. I've highlighted the key entities for your report.",
        mood: 'neutral'
      });
    }
  };

  return (
    <div className="article-detective-v4" style={styles.container}>
      {/* Biyonaz Guidance Box */}
      <div style={{ ...styles.biyonazBox, borderColor: styles.moodColors[biyonazFeedback.mood] }}>
        <div style={styles.biyonazAvatar}>👩‍🔬</div>
        <div>
          <strong style={{ color: styles.moodColors[biyonazFeedback.mood] }}>Biyonaz says:</strong>
          <p style={styles.biyonazText}>{biyonazFeedback.message}</p>
        </div>
      </div>

      <textarea 
        style={styles.textarea}
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Paste article text here..."
      />

      <div style={styles.buttonGroup}>
        <button onClick={performAnalysis} style={styles.analyzeBtn}>Ask Biyonaz to Scan</button>
      </div>

      {/* Results Rendering */}
      {results.detectedGenes.length > 0 && (
        <div style={styles.resultsArea}>
          <h3 style={styles.subHeader}>Detected by Biyonaz:</h3>
          <div style={styles.chipContainer}>
            {results.detectedGenes.map((gene, index) => (
              <a key={index} href={`https://www.ncbi.nlm.nih.gov/gene/?term=${gene}`} target="_blank" rel="noreferrer" style={styles.geneChip}>
                🧬 {gene}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '30px', borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' },
  biyonazBox: { 
    display: 'flex', gap: '15px', alignItems: 'center', padding: '15px', 
    backgroundColor: '#f8f9fa', borderRadius: '15px', borderLeft: '6px solid', marginBottom: '20px' 
  },
  biyonazAvatar: { fontSize: '40px', backgroundColor: '#fff', padding: '10px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  biyonazText: { margin: '5px 0 0 0', fontSize: '14px', fontStyle: 'italic', color: '#444' },
  textarea: { width: '100%', height: '120px', padding: '15px', borderRadius: '12px', border: '1px solid #ddd' },
  buttonGroup: { marginTop: '15px' },
  analyzeBtn: { backgroundColor: '#e91e63', color: '#fff', padding: '12px 25px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  resultsArea: { marginTop: '25px' },
  subHeader: { fontSize: '12px', color: '#aaa', textTransform: 'uppercase', marginBottom: '10px' },
  chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  geneChip: { textDecoration: 'none', backgroundColor: '#fce4ec', color: '#ad1457', padding: '6px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' },
  moodColors: {
    neutral: '#e91e63',
    happy: '#4caf50',
    warning: '#ff9800',
    searching: '#2196f3'
  }
};

export default ArticleDetective;
