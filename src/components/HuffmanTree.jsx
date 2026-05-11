import React, { useMemo } from 'react';

const getTreeDepth = (node) => {
  if (!node) return 0;
  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
};

export const HuffmanTree = ({ root }) => {
  const depth = useMemo(() => getTreeDepth(root), [root]);
  
  if (!root) return <div className="text-secondary">No tree to display. Compress some text first!</div>;

  const width = Math.max(800, Math.pow(2, depth - 1) * 60);
  const height = depth * 80;
  const startX = width / 2;
  const startY = 40;
  const initialDx = width / 4;
  const dy = 80;

  const renderNode = (node, x, y, dx) => {
    if (!node) return null;
    
    // Prevent lines from crossing by ensuring minimum dx
    const currentDx = Math.max(dx, 30);

    return (
      <g key={`${x}-${y}-${node.char || 'internal'}-${node.freq}`}>
        {node.left && (
          <>
            <line x1={x} y1={y} x2={x - currentDx} y2={y + dy} stroke="var(--border-color)" strokeWidth="2" />
            <text x={x - currentDx / 2 - 10} y={y + dy / 2} fill="var(--text-secondary)" fontSize="12" fontWeight="bold">0</text>
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y} x2={x + currentDx} y2={y + dy} stroke="var(--border-color)" strokeWidth="2" />
            <text x={x + currentDx / 2 + 10} y={y + dy / 2} fill="var(--text-secondary)" fontSize="12" fontWeight="bold">1</text>
          </>
        )}
        
        <circle 
          cx={x} 
          cy={y} 
          r="22" 
          fill={node.char !== null ? '#10b981' : 'var(--accent-color)'} 
          stroke="var(--bg-color)" 
          strokeWidth="3" 
        />
        
        <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="600">
          {node.char !== null 
            ? (node.char === ' ' ? 'SPC' : node.char === '\n' ? '\\n' : node.char) 
            : node.freq}
        </text>

        {renderNode(node.left, x - currentDx, y + dy, currentDx / 2)}
        {renderNode(node.right, x + currentDx, y + dy, currentDx / 2)}
      </g>
    );
  };

  return (
    <div className="tree-container glass-panel">
      <svg width={width} height={height + 40} style={{ overflow: 'visible' }}>
        {renderNode(root, startX, startY, initialDx)}
      </svg>
    </div>
  );
};
