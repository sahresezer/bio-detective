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
  const [insight, setInsight] = useState(null);

  const stopWords = ['DNA', 'RNA', 'PCR', 'ATP', 'PH', 'CELL', 'GENE', 'LAB', 'GEL', 'SDS'];

  const performAnalysis = async () => {
    const genePattern = /\b[A-Z][A-Z0-9]{2,8}\b/g;
    const pValuePattern = /p\s*[<>=]\s*[0-9.]+/gi;

    const uniqueGenes = [...new Set(articleText.match(genePattern) || [])].filter(word => !stopWords.includes(word));
    const pValues = articleText.match(pValuePattern) || [];

    setResults({
      detectedGenes: uniqueGenes,
      significantValues: pValues,
      analysisDate: new Date().toLocaleString()
    });

    const localInsight = detectBioInsights(articleText, uniqueGenes, pValues);
    setInsight(localInsight);

    updateBiyonaz(uniqueGenes, pValues, localInsight);

    if ( window.BioDective && window.BioDective.apiUrl ) {
      try {
        const response = await fetch(`${window.BioDective.apiUrl}analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.BioDective.nonce
          },
          body: JSON.stringify({ text: articleText })
        });
        if (response.ok) {
          const data = await response.json();
          setResults({
            detectedGenes: data.genes || uniqueGenes,
            significantValues: data.pvalues || pValues,
            analysisDate: new Date().toLocaleString()
          });
          setInsight(data.insight || localInsight);
          updateBiyonaz(data.genes || uniqueGenes, data.pvalues || pValues, data.insight || localInsight);
        }
      } catch (error) {
        console.warn('Bio Detective API failed, falling back to local insight.', error);
      }
    }
  };

  const detectBioInsights = (text, genes, pvals) => {
    const insights = {
      techniques: [],
      species: [],
      datasets: [],
      summary: '',
      score: 0
    };

    const techniqueRules = [
      { label: 'RNA-seq', regex: /\bRNA-?seq\b/i },
      { label: 'ChIP-seq', regex: /\bChIP-?seq\b/i },
      { label: 'qPCR', regex: /\bqPCR\b/i },
      { label: 'CRISPR', regex: /\bCRISPR\b/i },
      { label: 'Mass spectrometry', regex: /mass spectrom(etery|etry)\b/i },
      { label: 'Single-cell', regex: /single[-\s]?cell/i },
      { label: 'GWAS', regex: /\bGWAS\b|genome[-\s]?wide association/i }
    ];
    const speciesRules = [
      { label: 'Human', regex: /\b(Homo sapiens|human)\b/i },
      { label: 'Mouse', regex: /\b(Mus musculus|mouse)\b/i },
      { label: 'Yeast', regex: /\b(Saccharomyces cerevisiae|yeast)\b/i },
      { label: 'Zebrafish', regex: /\b(Danio rerio|zebrafish)\b/i }
    ];
    const datasetRules = [
      { label: 'GEO', regex: /\bGEO\b|Gene Expression Omnibus/i },
      { label: 'SRA', regex: /\bSRA\b|Sequence Read Archive/i },
      { label: 'TCGA', regex: /\bTCGA\b/i }
    ];

    techniqueRules.forEach(rule => {
      if (rule.regex.test(text)) {
        insights.techniques.push(rule.label);
      }
    });
    speciesRules.forEach(rule => {
      if (rule.regex.test(text)) {
        insights.species.push(rule.label);
      }
    });
    datasetRules.forEach(rule => {
      if (rule.regex.test(text)) {
        insights.datasets.push(rule.label);
      }
    });

    insights.techniques = [...new Set(insights.techniques)];
    insights.species = [...new Set(insights.species)];
    insights.datasets = [...new Set(insights.datasets)];

    insights.score = Math.min(100, 20 + genes.length * 5 + pvals.length * 10 + insights.techniques.length * 15 + insights.datasets.length * 10);
    if (insights.score < 30) {
      insights.summary = 'Free premium insight: this text is light on explicit experimental detail. Add statistics, dataset names, or method descriptions.';
    } else if (insights.score < 65) {
      insights.summary = 'Free premium insight: a solid article structure is present, but some bioinformatics context can be strengthened with dataset or species details.';
    } else {
      insights.summary = 'Free premium insight: excellent bioinformatics signal. The analysis contains strong experimental terms and research dataset clues.';
    }
    return insights;
  };

  const updateBiyonaz = (genes, pvals, insightData) => {
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
        message: `Jackpot! I found ${genes.length} gene candidates. This paper seems to be high-throughput! Free insight score: ${insightData?.score || 0}.`,
        mood: 'happy'
      });
    } else {
      setBiyonazFeedback({
        message: "Analysis complete. I've highlighted the key entities for your report, including free bioinformatics insight.",
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
        <button onClick={performAnalysis} style={styles.analyzeBtn}>Ask Biyonaz for Free Premium Insight</button>
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
      {insight && (
        <div style={styles.resultsArea}>
          <h3 style={styles.subHeader}>Free Bioinformatics Insight</h3>
          <p style={styles.insightSummary}>{insight.summary}</p>
          <div style={styles.insightMeta}>
            {insight.techniques.length > 0 && <span>Technique: {insight.techniques.join(', ')}</span>}
            {insight.species.length > 0 && <span>Species: {insight.species.join(', ')}</span>}
            {insight.datasets.length > 0 && <span>Datasets: {insight.datasets.join(', ')}</span>}
            <span>Insight Score: {insight.score}/100</span>
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
  insightSummary: { margin: '0 0 10px 0', fontSize: '14px', color: '#333' },
  insightMeta: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '12px', color: '#555' },
  moodColors: {
    neutral: '#e91e63',
    happy: '#4caf50',
    warning: '#ff9800',
    searching: '#2196f3'
  }
};

export default ArticleDetective;
