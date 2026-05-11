import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { buildFrequencyTable, buildHuffmanTree, generateCodes, compress, decompress } from './utils/huffman';
import { HuffmanTree } from './components/HuffmanTree';
import { EducationalSection } from './components/EducationalSection';

function App() {
  const [theme, setTheme] = useState('dark');
  const [inputText, setInputText] = useState('');
  
  // State for compression results
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [huffmanTree, setHuffmanTree] = useState(null);
  const [huffmanCodes, setHuffmanCodes] = useState(new Map());
  const [frequencies, setFrequencies] = useState(new Map());
  const [stats, setStats] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target.result);
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = null;
  };

  const handleCompress = () => {
    if (!inputText) {
      alert("Please enter some text to compress.");
      return;
    }

    const freqMap = buildFrequencyTable(inputText);
    const tree = buildHuffmanTree(freqMap);
    const codesMap = generateCodes(tree);
    const encoded = compress(inputText, codesMap);

    setFrequencies(freqMap);
    setHuffmanTree(tree);
    setHuffmanCodes(codesMap);
    setEncodedText(encoded);
    setDecodedText(''); // Reset decoded text on new compression

    // Calculate stats
    // Assuming standard ASCII 8 bits per character
    const originalBits = inputText.length * 8;
    const compressedBits = encoded.length;
    // Plus overhead of tree? We'll just show data size for simplicity as requested by "Compression Statistics"
    
    setStats({
      originalSize: originalBits,
      compressedSize: compressedBits,
      ratio: originalBits > 0 ? (originalBits / compressedBits).toFixed(2) : 0,
      savedPercent: originalBits > 0 ? (((originalBits - compressedBits) / originalBits) * 100).toFixed(2) : 0
    });
  };

  const handleDecompress = () => {
    if (!encodedText || !huffmanTree) {
      alert("No compressed data to decompress.");
      return;
    }
    const decoded = decompress(encodedText, huffmanTree);
    setDecodedText(decoded);
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-group">
          <div className="logo-icon">H</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Huffman Compressor</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Lossless Text Compression</p>
          </div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <main>
        <div className="main-grid">
          {/* Input Panel */}
          <div className="glass-panel">
            <div className="input-header">
              <h3>Input Text</h3>
              <div className="file-upload-wrapper">
                <button className="btn btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Upload .txt
                </button>
                <input 
                  type="file" 
                  accept=".txt" 
                  onChange={handleFileUpload} 
                  ref={fileInputRef}
                />
              </div>
            </div>
            
            <textarea 
              className="textarea" 
              placeholder="Enter text to compress here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            
            <div className="action-row">
              <button className="btn btn-primary" onClick={handleCompress}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                  <path d="M12 12v9"></path>
                  <path d="m8 17 4 4 4-4"></path>
                </svg>
                Compress Text
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="glass-panel">
            <h3>Compressed Output (Binary)</h3>
            <div className="code-output">
              {encodedText || <span style={{color: 'var(--text-secondary)'}}>No data compressed yet.</span>}
            </div>
            
            {encodedText && (
              <div className="action-row" style={{ justifyContent: 'space-between' }}>
                <button className="btn btn-secondary" onClick={() => downloadFile(encodedText, 'compressed_binary.txt')}>
                  Download Binary
                </button>
                <button className="btn btn-primary" onClick={handleDecompress}>
                  Decompress
                </button>
              </div>
            )}

            {decodedText && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3>Decompressed Text</h3>
                <div className="code-output" style={{ maxHeight: '100px' }}>
                  {decodedText}
                </div>
                <div className="action-row">
                  <button className="btn btn-secondary" onClick={() => downloadFile(decodedText, 'decompressed_text.txt')}>
                    Download Text
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Dashboard */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <div className="stat-value">{stats.originalSize}</div>
              <div className="stat-label">Original Bits</div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-value">{stats.compressedSize}</div>
              <div className="stat-label">Compressed Bits</div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-value">{stats.ratio}x</div>
              <div className="stat-label">Compression Ratio</div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-value" style={{ color: stats.savedPercent > 0 ? '#10b981' : '#ef4444' }}>
                {stats.savedPercent}%
              </div>
              <div className="stat-label">Space Saved</div>
            </div>
          </div>
        )}

        {/* Visualizations */}
        {huffmanTree && (
          <div className="visualization-section">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Visualizations</h2>
            
            <div className="main-grid">
              <div className="glass-panel">
                <h3 style={{ marginBottom: '1rem' }}>Character Frequency & Codes</h3>
                <div className="table-container" style={{ maxHeight: '400px' }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Character</th>
                        <th>Frequency</th>
                        <th>Huffman Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(frequencies.entries())
                        .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
                        .map(([char, freq]) => (
                        <tr key={char}>
                          <td>
                            <code style={{ background: 'var(--bg-color)', padding: '2px 6px', borderRadius: '4px' }}>
                              {char === ' ' ? 'SPACE' : char === '\n' ? '\\n' : char}
                            </code>
                          </td>
                          <td>{freq}</td>
                          <td style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>
                            {huffmanCodes.get(char)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '1rem' }}>Huffman Tree</h3>
                <div style={{ flex: 1, overflow: 'auto' }}>
                  <HuffmanTree root={huffmanTree} />
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem' }}>
                  Scroll horizontally to view the full tree if it's large.
                </p>
              </div>
            </div>
          </div>
        )}

        <EducationalSection />
      </main>
    </div>
  );
}

export default App;
