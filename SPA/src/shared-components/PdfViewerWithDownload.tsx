import React from "react";

interface PdfViewerWithDownloadProps {
  fileName: string;
}

const PdfViewerWithDownload: React.FC<PdfViewerWithDownloadProps> = ({
  fileName,
}) => {
  const filePath = `/pdf/${fileName}`;

  return (
    <div className="flex flex-col gap-4">
      <iframe
        src={filePath}
        title={fileName}
        width="100%"
        height="500px"
        className="border rounded"
      />
      <div>
        <a
          href={filePath}
          download={fileName}
          className="bg-blue-600 text-white px-4 py-2 rounded bg-primaryBrown hover:bg-[#8A4B38]"
        >
          PDF डाउनलोड करा
        </a>
      </div>
    </div>
  );
};

export default PdfViewerWithDownload;
