import React, { useState, useCallback } from 'react';

const S = {
  root: {
    fontFamily: "'Courier New', 'Lucida Console', monospace",
    background: '#0a0e1a',
    color: '#c8d8e8',
    minHeight: '100vh',
    padding: '40px 24px',
    boxSizing: 'border-box',
  },
  wrap: { maxWidth: '780px', margin: '0 auto' },
  header: { marginBottom: '36px' },
  titleRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' },
  title: { fontSize: '20px', fontWeight: '700', color: '#00ff88', letterSpacing: '3px', textTransform: 'uppercase' },
  subtitle: { fontSize: '12px', color: '#4a6080', letterSpacing: '2px', textTransform: 'uppercase', paddingLeft: '22px' },
  dividerLine: { border: 'none', borderTop: '1px solid #1a2a3a', margin: '24px 0' },
  uploadZone: {
    border: '1px solid #1e3a5a',
    borderRadius: '8px',
    padding: '32px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#0d1520',
    transition: 'border-color 0.2s, background 0.2s',
    marginBottom: '16px',
    position: 'relative',
    overflow: 'hidden',
  },
  uploadZoneHover: {
    border: '1px solid #00ff88',
    background: '#0a1a12',
  },
  uploadIcon: { fontSize: '32px', marginBottom: '10px', opacity: 0.7 },
  uploadTitle: { fontSize: '13px', color: '#00ff88', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' },
  uploadSub: { fontSize: '11px', color: '#2a4060', letterSpacing: '1px' },
  orRow: { textAlign: 'center', fontSize: '11px', color: '#2a4060', letterSpacing: '3px', margin: '12px 0' },
  textarea: {
    width: '100%',
    minHeight: '120px',
    background: '#0d1520',
    border: '1px solid #1e3a5a',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '12px',
    color: '#c8d8e8',
    fontFamily: "'Courier New', monospace",
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
    lineHeight: '1.6',
  },
  btn: {
    marginTop: '14px',
    width: '100%',
    padding: '14px',
    background: 'transparent',
    border: '1px solid #00ff88',
    borderRadius: '6px',
    color: '#00ff88',
    fontSize: '12px',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '3px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  btnHover: { background: 'rgba(0,255,136,0.08)' },
  fileName: { fontSize: '11px', color: '#00ff88', letterSpacing: '1px', marginBottom: '12px', opacity: 0.7 },
  resultWrap: { marginTop: '32px' },
  sectionLabel: {
    fontSize: '10px',
    color: '#4a6080',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  summaryBox: {
    background: '#0d1520',
    border: '1px solid #1e3a5a',
    borderLeft: '3px solid #00ff88',
    borderRadius: '6px',
    padding: '16px 20px',
    fontSize: '13px',
    color: '#a0c0d8',
    lineHeight: '1.8',
    marginBottom: '24px',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tr: { borderBottom: '1px solid #0f1e2e' },
  tdLabel: {
    padding: '10px 14px 10px 0',
    fontSize: '11px',
    color: '#4a6080',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    width: '160px',
  },
  tdVal: { padding: '10px 0', verticalAlign: 'top' },
  badge: {
    display: 'inline-block',
    background: '#0d1f2d',
    border: '1px solid #1e3a5a',
    color: '#7ab8d8',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontFamily: "'Courier New', monospace",
    margin: '2px',
  },
  badgeGreen: {
    display: 'inline-block',
    background: '#0a1f12',
    border: '1px solid #00ff8844',
    color: '#00ff88',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontFamily: "'Courier New', monospace",
    margin: '2px',
  },
  badgeBlue: {
    display: 'inline-block',
    background: '#0d1a2d',
    border: '1px solid #1a4a8a44',
    color: '#5aafff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontFamily: "'Courier New', monospace",
    margin: '2px',
  },
  none: { fontSize: '11px', color: '#2a4060', fontStyle: 'italic' },
  scoreRow: { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #1a2a3a' },
  scoreLabel: { fontSize: '10px', color: '#4a6080', letterSpacing: '2px', textTransform: 'uppercase' },
  scoreVal: { fontSize: '22px', fontWeight: '700', color: '#00ff88', fontFamily: "'Courier New', monospace" },
  scoreBar: { flex: 1, height: '3px', background: '#0d1520', borderRadius: '2px', overflow: 'hidden' },
  scoreBarFill: { height: '100%', background: 'linear-gradient(90deg, #00ff88, #00aaff)', borderRadius: '2px', transition: 'width 1s ease' },
  loading: { textAlign: 'center', fontSize: '11px', color: '#00ff88', letterSpacing: '3px', padding: '24px', animation: 'pulse 1.5s infinite' },
};

const DB_LIST = [
  'NCBI','UniProt','PDB','IEDB','GEO','SRA','TCGA','Ensembl','KEGG','GO',
  'STRING','BioGRID','IntAct','Reactome','OMIM','ClinVar','dbSNP','dbGaP',
  'ArrayExpress','PRIDE','PubChem','ChEMBL','DrugBank','PharmGKB',
  'HADDOCK','TASSER','ITASSER','ROSETTA','AlphaFold','MODELLER',
  'BLAST','BLAT','HMMER','CLUSTAL','MUSCLE','MAFFT',
  'SCRATCH','CELLO','PSIPRED','SOPMA','ProtParam','GRAVY',
  'AutoDock','Vina','Glide','GOLD','DOCK','ZDOCK',
  'GROMACS','AMBER','NAMD','CHARMM','Cytoscape',
  'GATK','STAR','HISAT2','SALMON','KALLISTO','DESeq2','edgeR',
  'Bowtie','BWA','SAMtools','ANNOVAR','SnpEff',
  'VFDB','CARD','ResFinder','SVM','ANN','XGBoost','MMGBSA',
];

const LINKER_SET = new Set([
  'EAAAK','GPGPG','AAY','KK','HEYGAEALERAG','PAPAP','GGGGS','GGGS',
  'GSG','GSGSG','GGGG','GGGGG','AAA','GPGPGPG','SGGGGS','ASGAG',
]);

const SKIP = new Set([
  'THE','AND','FOR','WITH','FROM','THAT','THIS','WERE','HAVE','BEEN','WHICH',
  'THEIR','THESE','THOSE','THAN','THEN','WHEN','ALSO','INTO','UPON','USED',
  'USING','BOTH','EACH','SUCH','AFTER','BEFORE','ABOUT','WHILE','UNDER',
  'BETWEEN','AGAINST','THROUGH','DURING','WITHOUT','HOWEVER','ALTHOUGH',
  'RNA','DNA','PCR','SNP','BMI','AUC','ROC','CI','OR','HR','FDR','NMR','MRI',
  'CT','ATP','ADP','GTP','NAD','FAD','ROS','ECM','EMT','TME','PBS','SDS',
  'PAGE','FACS','RT','MHC','HLA','IV','VI','VII','VIII','IX','XI','XII',
  'XVI','PS','PR','MD','LB','WT','KO','KD','OE','NC','NS','NA','ND','NR',
  'NT','NO','PCA','UMAP','TSNE','DEG','TPM','RPKM','FPKM','CPM',
  'USA','UK','EU','WHO','NIH','FDA','ISO','DOI','PDF','CSV','JSON','API',
  'FC','SD','SE','SEM','LFC','CTL','HTL','LBL','MEV','HIT','NCTC','CF',
  'MRSA','MHCI','MHCII','IgG','IgE','IgM','IgA',
  ...DB_LIST, ...LINKER_SET,
]);

function analyze(text) {
  const pvalues = [...new Set([...text.matchAll(/p[\s\-]?(?:value)?[\s]*[<>=≤≥]+[\s]*\d*\.?\d+(?:[eE][+-]?\d+)?/gi)].map(m => m[0].replace(/\s+/g,'')))].slice(0,8);
  const foldChanges = [...new Set([...text.matchAll(/fold[- ]?change\s*(?:of\s*)?[=:]?\s*[\d.]+|FC\s*[=:]\s*[\d.]+|\d+\.?\d*[\s-]*fold/gi)].map(m => m[0].trim()))].slice(0,8);
  const correlations = [...new Set([...text.matchAll(/[Rr](?:\s*²)?\s*=\s*[-]?0?\.\d+|correlation.*?r\s*=\s*[-]?[\d.]+/gi)].map(m => m[0].trim()))].slice(0,5);
  const datasets = [...new Set([...text.matchAll(/GSE\d+|SRP\d+|PRJNA\d+|TCGA-[A-Z]+|E-MTAB-\d+|PXD\d+|EGAD\d+/g)].map(m => m[0]))];
  const databases = DB_LIST.filter(db => new RegExp(`\\b${db.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'i').test(text));
  const genes = [...new Set([...text.matchAll(/\b[A-Z][A-Z0-9]{2,7}\b/g)].map(m => m[0]).filter(g => {
    if (SKIP.has(g) || LINKER_SET.has(g)) return false;
    if (/^\d+$/.test(g) || /^[IVXLCDM]+$/.test(g)) return false;
    if (/^(.)\1+$/.test(g)) return false;
    if (/^[ACDEFGHIKLMNPQRSTVWY]{3,6}$/.test(g) && g.length <= 6) return false;
    return true;
  }))].slice(0,20);
  const techniques = ['RNA-seq','scRNA-seq','ChIP-seq','ATAC-seq','CRISPR','GWAS','qPCR','RT-PCR','Western blot','ELISA','Flow cytometry','Mass spectrometry','Proteomics','Metabolomics','Metagenomics','Whole exome sequencing','Whole genome sequencing','Hi-C','Single-cell','Molecular docking','Molecular dynamics','Homology modeling','Reverse vaccinology','Immunoinformatics','Subtractive proteomics','Network pharmacology'].filter(t => new RegExp(t,'i').test(text));
  const organisms = [['Human','human|Homo sapiens'],['Mouse','\\bmouse\\b|Mus musculus'],['Rat','\\brat\\b|Rattus'],['Zebrafish','zebrafish|Danio rerio'],['Yeast','\\byeast\\b|Saccharomyces'],['Drosophila','Drosophila'],['C. elegans','elegans|nematode'],['S. aureus','Staphylococcus|S\\. aureus'],['E. coli','Escherichia coli|E\\. coli'],['Mycobacterium','Mycobacterium|tuberculosis']].filter(([,p]) => new RegExp(p,'i').test(text)).map(([n]) => n);

  let score = 20;
  score += Math.min(genes.length*3,15);
  score += Math.min(pvalues.length*10,20);
  score += Math.min(techniques.length*8,20);
  score += Math.min(datasets.length*10,15);
  score += Math.min(foldChanges.length*5,10);
  score += Math.min(databases.length*2,10);
  score = Math.min(score,100);

  const techStr = techniques.length > 0 ? `${techniques.slice(0,2).join(' ve ')} yöntemi kullanılarak` : '';
  const geneStr = genes.length > 0 ? `${genes.slice(0,3).join(', ')} gibi moleküler hedefler incelenmiş` : '';
  const orgStr = organisms.length > 0 ? `${organisms.slice(0,2).join(' ve ')} üzerinde` : '';
  const dbStr = databases.length > 0 ? `${databases.slice(0,3).join(', ')} araçları kullanılmış.` : '';
  const statStr = pvalues.length > 0 ? `İstatistiksel analizde ${pvalues.slice(0,2).join(', ')} değerleri raporlanmış.` : '';
  const dataStr = datasets.length > 0 ? `Veriler ${datasets[0]} erişim numarasıyla paylaşılmış.` : '';
  const summary = (techniques.length||genes.length||organisms.length)
    ? `Bu çalışmada ${orgStr} ${techStr} ${geneStr}. ${dbStr} ${statStr} ${dataStr}`.replace(/\s+/g,' ').trim()
    : 'Yeterli biyoinformatik içerik tespit edilemedi. Daha kapsamlı bir makale metni girin.';

  return { pvalues, foldChanges, correlations, datasets, databases, genes, techniques, organisms, score, summary };
}

async function readPDF(file) {
  return new Promise((resolve, reject) => {
    const run = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const r = new FileReader();
      r.onload = async e => {
        try {
          const pdf = await window.pdfjsLib.getDocument({data: e.target.result}).promise;
          let t = '';
          for (let i=1;i<=pdf.numPages;i++) { const p=await pdf.getPage(i); const c=await p.getTextContent(); t+=c.items.map(x=>x.str).join(' ')+'\n'; }
          resolve(t);
        } catch(e){reject(e);}
      };
      r.readAsArrayBuffer(file);
    };
    if (window.pdfjsLib) { run(); }
    else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      s.onload = run; s.onerror = () => reject(new Error('pdf.js yüklenemedi'));
      document.head.appendChild(s);
    }
  });
}

export default function ArticleDetective() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleFile = useCallback(async file => {
    if (!file) return;
    setFileName(file.name); setResult(null);
    if (file.type === 'application/pdf') {
      setPdfLoading(true);
      try { setText(await readPDF(file)); } catch { alert('PDF okunamadı. Metni kopyalayıp yapıştırın.'); } finally { setPdfLoading(false); }
    } else {
      const r = new FileReader();
      r.onload = e => setText(e.target.result);
      r.readAsText(file);
    }
  }, []);

  const handleAnalyze = () => {
    if (!text.trim()) { alert('Lütfen metin girin veya dosya yükleyin.'); return; }
    setLoading(true);
    setTimeout(() => { setResult(analyze(text)); setLoading(false); }, 900);
  };

  const rows = result ? [
    ['GENES / PROTEINS', result.genes, 'default'],
    ['P-VALUE', result.pvalues, 'green'],
    ['FOLD CHANGE', result.foldChanges, 'green'],
    ['CORRELATION (R)', result.correlations, 'green'],
    ['DATASET IDs', result.datasets, 'green'],
    ['DATABASES / TOOLS', result.databases, 'blue'],
    ['TECHNIQUES', result.techniques, 'default'],
    ['ORGANISMS', result.organisms, 'default'],
  ] : [];

  return (
    <div style={S.root}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      <div style={S.wrap}>
        <div style={S.header}>
          <div style={S.titleRow}>
            <div style={S.dot} />
            <div style={S.title}>Bio Detective</div>
          </div>
          <div style={S.subtitle}>Biyoinformatik Makale Analiz Sistemi</div>
        </div>

        <hr style={S.dividerLine} />

        <div
          style={{...S.uploadZone, ...(dragOver ? S.uploadZoneHover : {})}}
          onDragOver={e=>{e.preventDefault();setDragOver(true);}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}
          onClick={()=>document.getElementById('bd-file').click()}
        >
          <div style={S.uploadIcon}>⬆</div>
          <div style={S.uploadTitle}>Dosya Yükle</div>
          <div style={S.uploadSub}>PDF veya TXT · Sürükle bırak veya tıkla</div>
          <input id="bd-file" type="file" accept=".pdf,.txt" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])} />
        </div>

        {pdfLoading && <div style={S.loading}>PDF OKUNUYOR...</div>}
        {fileName && !pdfLoading && <div style={S.fileName}>▸ {fileName}</div>}

        <div style={S.orRow}>— VEYA METİN YAPIŞTIRINIZ —</div>

        <textarea
          style={S.textarea}
          placeholder="// makale metnini buraya yapıştırın..."
          value={text}
          onChange={e=>setText(e.target.value)}
        />

        <button
          style={{...S.btn, ...(btnHover?S.btnHover:{})}}
          onMouseEnter={()=>setBtnHover(true)}
          onMouseLeave={()=>setBtnHover(false)}
          onClick={handleAnalyze}
        >
          {loading ? '[ ANALİZ EDİLİYOR... ]' : '[ ANALİZ ET ]'}
        </button>

        {result && !loading && (
          <div style={S.resultWrap}>
            <hr style={S.dividerLine} />
            <div style={S.sectionLabel}>// Biyonaz Özeti</div>
            <div style={S.summaryBox}>{result.summary}</div>

            <div style={S.sectionLabel}>// Tespit Edilen Parametreler</div>
            <table style={S.table}>
              <tbody>
                {rows.map(([label, values, type]) => (
                  <tr key={label} style={S.tr}>
                    <td style={S.tdLabel}>{label}</td>
                    <td style={S.tdVal}>
                      {values && values.length > 0
                        ? values.map((v,i) => (
                            <span key={i} style={type==='green'?S.badgeGreen:type==='blue'?S.badgeBlue:S.badge}>{v}</span>
                          ))
                        : <span style={S.none}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={S.scoreRow}>
              <div style={S.scoreLabel}>Kalite Skoru</div>
              <div style={S.scoreVal}>{result.score}</div>
              <div style={S.scoreBar}>
                <div style={{...S.scoreBarFill, width:`${result.score}%`}} />
              </div>
              <div style={{...S.scoreLabel}}>/ 100</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
