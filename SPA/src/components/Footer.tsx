const Footer = () => {
  return (
    <footer className="bg-[#5E3023] text-white mt-4" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center text-center gap-6">
        {/* Title / Info */}
        <div className="text-md leading-relaxed max-w-2xl">
          <p className="font-semibold text-2xl mb-2">
            एकात्मिक आदिवासी विकास - शहापूर
          </p>
          <p>
            आदिवासींच्या कल्याणाच्या योजनांची परिणामकारक अंमलबजावणी करण्यासाठी
            सन १९७२ मध्ये समाजकल्याण विभागांतर्गत आदिवासी विकास संचलनालयाची
            स्थापना करण्यात आली होती.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="bg-white/10 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all duration-200">
            📞 <span className="font-semibold">टोल फ्री नंबर:</span> 1800 2670
            007
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all duration-200">
            ✉️{" "}
            <a href="/contactUs" className="underline hover:text-gray-300">
              संपर्क करा
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/80">
          © {new Date().getFullYear()} एकात्मिक आदिवासी विकास - शहापूर. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
