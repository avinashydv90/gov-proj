const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-white py-4">
      <div className="container text-center">
        {/* Footer Menu */}
        <div className="footerMenu">
          <ul className="list-inline">
            <li className="list-inline-item mx-3">
              <a
                href="https://dhule.gov.in/website-policies/"
                className="text-white"
              >
                Website Policies
              </a>
            </li>
            <li className="list-inline-item mx-3">
              <a href="https://dhule.gov.in/help/" className="text-white">
                Help
              </a>
            </li>
            <li className="list-inline-item mx-3">
              <a href="https://dhule.gov.in/contact-us/" className="text-white">
                Contact Us
              </a>
            </li>
            <li className="list-inline-item mx-3">
              <a href="https://dhule.gov.in/feedback/" className="text-white">
                Feedback
              </a>
            </li>
          </ul>
        </div>

        {/* Content Owned */}
        <div className="mt-3">
          <p className="mb-1">Content Owned by District Administration</p>
          <p>
            © District Administration, Dhule. Developed and hosted by{" "}
            <a
              href="http://www.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              National Informatics Centre
            </a>
            ,<br />
            <a
              href="http://meity.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Ministry of Electronics & Information Technology
            </a>
            , Government of India
          </p>
          <p>
            Last Updated: <strong>Mar 21, 2025</strong>
          </p>
        </div>

        {/* Logos */}
        <div className="mt-3">
          <a
            href="https://s3waas.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://dhule.gov.in/wp-content/plugins/common_utility/images/S3WaaS.png"
              alt="Secure, Scalable and Sugamya Website as a Service"
              className="mx-2"
              width="120"
            />
          </a>
          <a
            href="http://www.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://dhule.gov.in/wp-content/themes/district-theme/images/nicLogo.png"
              alt="National Informatics Centre"
              className="mx-2"
              width="120"
            />
          </a>
          <a
            href="http://www.digitalindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://dhule.gov.in/wp-content/themes/district-theme/images/digitalIndia.png"
              alt="Digital India"
              className="mx-2"
              width="120"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
