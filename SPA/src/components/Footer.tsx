const Footer = () => {
  return (
    <footer className="bg-primaryBrown text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Title */}
        <div className="text-xl font-bold">आपली संस्था</div>

        {/* Navigation Links */}
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Gallery
          </a>
          <a href="#" className="hover:underline">
            Events
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-center md:text-right">
          © {new Date().getFullYear()} आपली संस्था. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
