export class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

export class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].freq <= this.heap[index].freq) break;
      
      let temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[index];
      this.heap[index] = temp;
      
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    let smallest = index;

    if (leftChild < this.heap.length && this.heap[leftChild].freq < this.heap[smallest].freq) {
      smallest = leftChild;
    }
    if (rightChild < this.heap.length && this.heap[rightChild].freq < this.heap[smallest].freq) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      let temp = this.heap[index];
      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = temp;
      this.bubbleDown(smallest);
    }
  }
}

export function buildFrequencyTable(text) {
  const freqMap = new Map();
  for (let char of text) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }
  return freqMap;
}

export function buildHuffmanTree(freqMap) {
  if (freqMap.size === 0) return null;
  
  const minHeap = new MinHeap();
  for (let [char, freq] of freqMap) {
    minHeap.insert(new HuffmanNode(char, freq));
  }

  // Handle edge case where text contains only one unique character
  if (minHeap.size() === 1) {
    const singleNode = minHeap.extractMin();
    return new HuffmanNode(null, singleNode.freq, singleNode, null);
  }

  while (minHeap.size() > 1) {
    let left = minHeap.extractMin();
    let right = minHeap.extractMin();
    
    let parent = new HuffmanNode(null, left.freq + right.freq, left, right);
    minHeap.insert(parent);
  }

  return minHeap.extractMin();
}

export function generateCodes(node, prefix = '', codes = new Map()) {
  if (!node) return codes;

  if (node.char !== null) {
    // For single-character string case, the code is '0'
    codes.set(node.char, prefix === '' ? '0' : prefix);
  } else {
    generateCodes(node.left, prefix + '0', codes);
    generateCodes(node.right, prefix + '1', codes);
  }

  return codes;
}

export function compress(text, codesMap) {
  let encoded = '';
  for (let char of text) {
    encoded += codesMap.get(char);
  }
  return encoded;
}

export function decompress(encodedText, root) {
  if (!root) return '';
  if (!root.left && !root.right) {
    // Handle single character case
    let decoded = '';
    for (let i = 0; i < encodedText.length; i++) {
      decoded += root.char;
    }
    return decoded;
  }

  let decoded = '';
  let currentNode = root;

  for (let bit of encodedText) {
    if (bit === '0') {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }

    if (currentNode.left === null && currentNode.right === null) {
      decoded += currentNode.char;
      currentNode = root;
    }
  }

  return decoded;
}
