const Footer = () => {
  return (
    <footer className="bg-[#5E3023] text-white mt-8">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center text-center gap-4">
        {/* Title / Info */}
        <div className="text-sm leading-relaxed">
          <p className="font-semibold mb-2">एकात्मिक आदिवासी विकास - शहापूर</p>
          <p>
            आदिवासींच्या कल्याणाच्या योजनांची परिणामकारक अंमलबजावणी करण्यासाठी
            सन १९७२ मध्ये समाजकल्याण विभागांतर्गत आदिवासी विकास संचलनालयाची
            स्थापना करण्यात आली होती.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-xs">
          © {new Date().getFullYear()} एकात्मिक आदिवासी विकास - शहापूर. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
