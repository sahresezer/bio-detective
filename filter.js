import React, { useState } from 'react';

/**
 * ArticleDetective Component - Phase 3
 * Feature: Filtering non-gene terms & Interactive UI feedback.
 */
const ArticleDetective = () => {
  const [articleText, setArticleText] = useState('');
  const [results, setResults] = useState({
    detectedGenes: [],
    significantValues: [],
    analysisDate: ''
  });
  const [activePreview, setActivePreview] = useState(null);

  // List of common biological terms to exclude from Gene detection
  const stopWords = ['DNA', 'RNA', 'PCR', 'ATP', 'PH', 'CELL', 'GENE', 'LAB', 'GEL', 'SDS'];

  const performAnalysis = () => {
    const genePattern = /\b[A-Z][A-Z0-9]{2,8}\b/g;
    const pValuePattern = /p\s*[<>=]\s*[0-9.]+/gi;

    // Filter logic: Check if the word is NOT in the stopWords list
    const foundEntities = text => {
      const matches = text.match(genePattern) || [];
      return [...new Set(matches)].filter(word => !stopWords.includes(word));
    };

    const uniqueGenes = foundEntities(articleText);
    const pValues = articleText.match(pValuePattern) || [];

    setResults({
      detectedGenes: uniqueGenes,
      significantValues: pValues,
      analysisDate: new Date().toLocaleString()
    });
  };

  const getNCBILink = (gene) => `https://www.ncbi.nlm.nih.gov/gene/?term=${gene}`;

  return (
    <div className="article-detective-v3" style={styles.container}>
      <h2 style={styles.header}>🕵️‍♀️ Article Detective v3.0</h2>
      
      {/* Input Section */}
      <textarea 
        style={styles.textarea}
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Paste scientific text... Phase 3 will filter out terms like 'DNA' or 'PCR'."
      />