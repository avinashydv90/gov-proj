import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavigationMenu from "./NavigationMenu";

const Header = () => {
  return (
    <div
      className="header-wrapper w-100 bg-light py-2 "
      style={{
        backgroundRepeat: "repeat",
        // backgroundImage: "url(../images/3.jpg)",
      }}
    >
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          {/* Logo Section */}
          <Col lg={4} md={4} sm={4} xs={4}>
            <div className="logo d-flex align-items-center justify-content-center">
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
                <Image
                  className="sw-logo header-logo right-logo"
                  src="/images/headerRightLogo.png"
                  alt="Digital India"
                  fluid
                />
                <img
                  src="../public/images/emblem_transparent1.png"
                  alt="Additional Image"
                  className="additional-image"
                />
                <span>
                  <strong className="maharashtra-gov small">
                    महाराष्ट्र शासन
                  </strong>
                  <span className="site_name_english d-block large">
                    आदिवासी विकास विभाग
                  </span>
                </span>
              </a>
            </div>
          </Col>
          <Col>
            <NavigationMenu />
          </Col>
          {/* <Col
            lg={4}
            md={4}
            sm={4}
            xs={4}
            className="d-flex flex-column align-items-center"
          >
            <div className="d-flex flex-row align-items-center">
              <img
                src="../public/images/emblem_transparent1.png"
                alt="Additional Image"
                className="additional-image"
              />
              <span>
                <strong className="maharashtra-gov small">
                  महाराष्ट्र शासन
                </strong>
                <span className="site_name_english d-block large">
                  आदिवासी विकास विभाग
                </span>
              </span>
            </div>
          </Col> */}

          {/* Right Section */}

          {/* <Col lg={4} md={4} sm={4} xs={4}>
            <div className="logo d-flex align-items-center justify-content-center">
              <Image
                className="sw-logo header-logo right-logo"
                src="/images/headerRightLogo.png"
                alt="Digital India"
                fluid
              />
            </div>
          </Col> */}
          {/* <Col lg={4} md={4} sm={4} xs={4} className="text-end">
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
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default Header;
