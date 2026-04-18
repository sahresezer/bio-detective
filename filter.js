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
  
  // İleriki aşamalar için ayrılmış state (şu an kullanılmıyor ama kalsın)
  const [activePreview, setActivePreview] = useState(null);

  // Gen algılamasından hariç tutulacak yaygın biyolojik terimler
  const stopWords = ['DNA', 'RNA', 'PCR', 'ATP', 'PH', 'CELL', 'GENE', 'LAB', 'GEL', 'SDS'];

  // Metin analizini gerçekleştiren fonksiyon
  const performAnalysis = () => {
    // Genleri ve p-değerlerini yakalamak için Regex kuralları
    const genePattern = /\b[A-Z][A-Z0-9]{2,8}\b/g;
    const pValuePattern = /p\s*[<>=]\s*[0-9.]+/gi;

    // Bulunan kelimeleri stopWords ile filtreleyen iç fonksiyon
    const foundEntities = text => {
      const matches = text.match(genePattern) || [];
      // Set kullanılarak mükerrer kayıtlar engellenir, ardından filter ile stopWords çıkarılır
      return [...new Set(matches)].filter(word => !stopWords.includes(word));
    };

    const uniqueGenes = foundEntities(articleText);
    const pValues = articleText.match(pValuePattern) || [];

    // State'i analiz sonuçlarıyla güncelliyoruz
    setResults({
      detectedGenes: uniqueGenes,
      significantValues: pValues,
      analysisDate: new Date().toLocaleString()
    });
  };

  const getNCBILink = (gene) => `https://www.ncbi.nlm.nih.gov/gene/?term=${gene}`;

  // DÜZELTME 1: Eksik olan styles nesnesi tanımlandı.
  const styles = {
    container: { fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#f4f7f6', borderRadius: '8px' },
    header: { color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' },
    textarea: { width: '100%', minHeight: '150px', padding: '15px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '15px', resize: 'vertical' },
    button: { backgroundColor: '#3498db', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
    resultsSection: { marginTop: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    list: { listStyleType: 'square', paddingLeft: '20px' },
    link: { color: '#e74c3c', textDecoration: 'none', fontWeight: 'bold' }
  };

  return (
    <div className="article-detective-v3" style={styles.container}>
      <h2 style={styles.header}>🕵️‍♀️ Article Detective v3.0</h2>
      
      {/* Input Bölümü */}
      <textarea 
        style={styles.textarea}
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Bilimsel metni buraya yapıştırın... Phase 3 'DNA' veya 'PCR' gibi terimleri filtreleyecektir."
      />    
      
      {/* DÜZELTME 2: Analizi başlatmak için buton eklendi */}
      <button style={styles.button} onClick={performAnalysis}>
        Analiz Et 🔬
      </button>

      {/* DÜZELTME 3: State güncellendiğinde sonuçları ekranda gösterecek bölüm eklendi */}
      {results.analysisDate && (
        <div style={styles.resultsSection}>
          <h3>📊 Analiz Sonuçları</h3>
          <p style={{ fontSize: '12px', color: 'gray' }}>Son analiz: {results.analysisDate}</p>

          <h4>🧬 Tespit Edilen Genler ({results.detectedGenes.length}):</h4>
          {results.detectedGenes.length > 0 ? (
            <ul style={styles.list}>
              {results.detectedGenes.map((gene, index) => (
                <li key={index}>
                  <a href={getNCBILink(gene)} target="_blank" rel="noopener noreferrer" style={styles.link} title="NCBI'da Görüntüle">
                    {gene}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Metinde geçerli bir gen adı bulunamadı.</p>
          )}

          <h4>📈 Anlamlılık Değerleri (P-Values) ({results.significantValues.length}):</h4>
          {results.significantValues.length > 0 ? (
             <ul style={styles.list}>
             {results.significantValues.map((val, index) => (
               <li key={index}>{val}</li>
             ))}
           </ul>
          ) : (
            <p>Metinde "p &lt; 0.05" benzeri bir p-değeri bulunamadı.</p>
          )}
        </div>
      )}

    {/* DÜZELTME 4: Kapsayıcı div ve fonksiyon düzgünce kapatıldı */}
    </div>
  );
};

export default ArticleDetective;