import React from 'react';

export const EducationalSection = () => {
  return (
    <div className="edu-section">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>How It Works</h2>
      <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
        Huffman Coding is a popular algorithm used for <strong>lossless data compression</strong>. 
        It assigns variable-length codes to input characters, with shorter codes assigned to more frequent characters.
      </p>

      <div className="edu-grid">
        <div className="edu-card glass-panel">
          <h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Why is it Lossless?
          </h3>
          <p>
            Lossless compression means that the original data can be perfectly reconstructed from the compressed data, without losing a single bit of information. 
            Huffman coding achieves this by using a <strong>prefix rule</strong>: no code is a prefix of another code. This ensures that the encoded binary string can be decoded unambiguously.
          </p>
        </div>

        <div className="edu-card glass-panel">
          <h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            Why use a Min Heap?
          </h3>
          <p>
            To build the Huffman Tree optimally, we repeatedly need to find the two nodes with the lowest frequencies. 
            A Min Heap (Priority Queue) allows us to extract the minimum element in <strong>O(log N)</strong> time, making the tree-building process highly efficient compared to sorting an array every time.
          </p>
        </div>

        <div className="edu-card glass-panel">
          <h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Time & Space Complexity
          </h3>
          <p>
            <strong>Time Complexity:</strong> O(N log N) where N is the number of unique characters. Building the frequency map takes O(L) where L is text length. Building the tree takes O(N log N) due to heap operations.
            <br/><br/>
            <strong>Space Complexity:</strong> O(N) to store the frequency map, the Min Heap, and the Huffman Tree.
          </p>
        </div>

        <div className="edu-card glass-panel">
          <h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Real-world Applications
          </h3>
          <p>
            Huffman coding is a fundamental algorithm used in many modern compression formats:
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>ZIP / GZIP:</strong> Uses DEFLATE, which combines LZ77 and Huffman Coding.</li>
              <li><strong>JPEG & PNG:</strong> Image compression formats use Huffman coding in their final stages.</li>
              <li><strong>MP3:</strong> Audio compression relies on it for quantizing data.</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};
