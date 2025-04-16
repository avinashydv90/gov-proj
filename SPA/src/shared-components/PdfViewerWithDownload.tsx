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
      <div className="w-full border rounded overflow-hidden">
        <iframe
          src={filePath}
          title={fileName}
          className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh]"
        />
      </div>

      <div>
        <a
          href={filePath}
          download={fileName}
          className="bg-[#5E3023] text-white px-4 py-2 rounded hover:bg-[#8A4B38] transition"
        >
          PDF डाउनलोड करा
        </a>
      </div>
    </div>
  );
};

export default PdfViewerWithDownload;
