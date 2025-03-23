import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Header = () => {
  return (
    <div className="header-wrapper w-100 bg-light py-2">
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          {/* Logo Section */}
          <Col lg={4} md={4} sm={4} xs={4}>
            <div className="logo d-flex align-items-center">
              <a
                href="/"
                title="Go to home"
                className="site_logo d-flex align-items-center text-decoration-none"
                rel="home"
              >
                <Image
                  id="logo"
                  className="emblem header-logo"
                  src="/images/headerLogo.png"
                  alt="State Emblem of India"
                  fluid
                />
              </a>
            </div>
          </Col>
          <Col
            lg={4}
            md={4}
            sm={4}
            xs={4}
            className="d-flex flex-column align-items-center text-center"
          >
            <div className=" d-flex flex-column align-items-center">
              <div className="logo_text">
                <strong>महाराष्ट्र शासन</strong>
                <span className="site_name_english d-block">
                  आदिवासी विकास विभाग <br />
                  प्रकल्प अधिकारी, एकात्मिक आदिवासी विकास प्रकल्प शहापूर ऋतु
                  पार्क, दुसरा मजला, रिलाईन्स स्मार्ट पॉईंट शेजारी,
                  गोठेघर-शहापूर ता. शहापूर जि.ठाणे
                </span>
              </div>
            </div>
          </Col>

          {/* Right Section */}
          <Col lg={4} md={4} sm={4} xs={4} className="text-end">
            <div className="header-right d-none d-sm-inline-block">
              <a
                aria-label="Digital India - External site that opens in a new window"
                href="https://www.digitalindia.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Digital India"
                onClick={() =>
                  window.confirm(
                    "You are being redirected to an external website. Guidelines for Indian Government Websites and apps (GIGW) cannot be held responsible for external content & privacy policies."
                  )
                }
              >
                <Image
                  className="sw-logo header-logo right-logo"
                  src="/images/headerRightLogo.png"
                  alt="Digital India"
                  fluid
                />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
