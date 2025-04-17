import React, { useEffect, useState } from "react";
import TreeView from "./TreeView";
import HeadingText from "./HeadingText";
import PdfViewerWithDownload from "./PdfViewerWithDownload";

interface TreeNode {
  name: string;
  type: "folder" | "file";
  path?: string;
  children?: TreeNode[];
}

const DocumentExplorer: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    fetch("/folderStructure.json")
      .then((res) => res.json())
      .then((data) => setTreeData(data));
  }, []);

  return (
    <div className="flex gap-6 p-4">
      {/* Left: Tree View */}
      <div className="md:w-1/3 bg-white shadow-lg rounded-xl p-4 border border-gray-200">
        <HeadingText text="विभागीय योजना" />
        <TreeView data={treeData} onSelect={setSelectedPdf} />
      </div>

      {/* Right: PDF Preview */}
      <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {selectedPdf ? (
          <>
            <PdfViewerWithDownload fileName={selectedPdf} />
          </>
        ) : (
          <p className="text-gray-500">कृपया फाईल निवडा.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentExplorer;
