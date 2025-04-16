import React from "react";

interface TreeNode {
  name: string;
  type: "folder" | "file";
  path?: string;
  children?: TreeNode[];
}

interface Props {
  data: TreeNode[];
  onSelect: (path: string) => void;
}

const TreeView: React.FC<Props> = ({ data, onSelect }) => {
  const renderTree = (nodes: TreeNode[]) =>
    nodes.map((node, index) => (
      <div className="tree-node" key={index}>
        {node.type === "folder" ? (
          <details className="folder">
            <summary className="folder-name">📁 {node.name}</summary>
            {node.children && renderTree(node.children)}
          </details>
        ) : (
          <p className="file" onClick={() => onSelect(node.path!)}>
            📄 {node.name}
          </p>
        )}
      </div>
    ));

  return <div className="tree-container">{renderTree(data)}</div>;
};

export default TreeView;
