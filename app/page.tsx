'use client'

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TreePage = () => {
  const [depth, setDepth] = useState(1);
  const [maxChildren, setMaxChildren] = useState(1);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setDepth(value);
  };

  const handleMaxChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setMaxChildren(value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  type TreeNode = {
    value: number;
    children: TreeNode[];
  };
  
  const generateTree = (depth: number, maxChildren: number): TreeNode => {
    const createNode = (currentDepth: number): TreeNode => {
      if (currentDepth > depth) return null!;
      const numChildren = Math.floor(Math.random() * maxChildren) + 1;
      return {
        value: Math.floor(Math.random() * 100),
        children: Array.from({ length: numChildren }, () => createNode(currentDepth + 1)).filter(
          (child) => child !== null
        ),
      };
    };
    return createNode(1);
  };

  const balanceTree = (root: TreeNode): TreeNode => {
    const values: number[] = [];
  
    const traverse = (node: TreeNode) => {
      values.push(node.value);
      node.children.forEach(traverse);
    };
  
    traverse(root);
  
    values.sort((a, b) => a - b);
  
    const buildBalancedBST = (sortedValues: number[]): TreeNode => {
      if (sortedValues.length === 0) return null!;
      const mid = Math.floor(sortedValues.length / 2);
      return {
        value: sortedValues[mid],
        children: [
          buildBalancedBST(sortedValues.slice(0, mid)),
          buildBalancedBST(sortedValues.slice(mid + 1)),
        ].filter((child) => child !== null),
      };
    };
  
    return buildBalancedBST(values);
  };
  const handleNewTree = () => {
    const newTree = generateTree(depth, maxChildren);
    setTree(newTree);
    setTextareaValue(JSON.stringify(newTree, null, 2));
  };

  const handleBalanceTree = () => {
    if (tree) {
      const balancedTree = balanceTree(tree);
      setTextareaValue(JSON.stringify(balancedTree, null, 2));
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <textarea
          className="form-control"
          rows={10}
          value={textareaValue}
          onChange={handleTextareaChange}
        />
      </div>
      <form className="row g-3">
        <div className="col-md-3">
          <label htmlFor="depthInput" className="form-label">Tree Depth</label>
          <input
            type="number"
            id="depthInput"
            className="form-control"
            value={depth}
            onChange={handleDepthChange}
            min="1"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="maxChildrenInput" className="form-label">Max Children per Node</label>
          <input
            type="number"
            id="maxChildrenInput"
            className="form-control"
            value={maxChildren}
            onChange={handleMaxChildrenChange}
            min="1"
          />
        </div>
        <div className="col-md-3 align-self-end">
          <button type="button" className="btn btn-primary me-2" onClick={handleNewTree}>New</button>
          <button type="button" className="btn btn-secondary" onClick={handleBalanceTree}>Balance</button>
        </div>
      </form>
    </div>
  );
};

export default TreePage;