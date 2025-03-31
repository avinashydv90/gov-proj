import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import KeyPersons from "./KeyPersons";
import DetailLink from "./DetailLink";

const HomeDetail = () => {
  return (
    <div className="bg-wrapper top-bg-wrapper gray-bg py-5">
      <Container className="common-container four_content body-container top-body-container py-4">
        <Row>
          <Col md={8} className="left-block">
            <h2>
              <em>Welcome to </em>
              <span>Ministry/Department</span>
            </h2>
            <p>
              An informative text section that outlines the work portfolio of
              the ministry and the initiatives/schemes and other useful purpose
              that the ministry website serves. An informative text section that
              outlines the work portfolio of the ministry and the
              initiatives/schemes and other useful purpose that the ministry
              website serves.
            </p>
            <p>
              An informative text section that outlines the work portfolio of
              the ministry and the initiatives/schemes and other useful purpose
              that the ministry website serves.
            </p>
            <div className="view-footer"></div>
            <Row>
              <DetailLink />
            </Row>
          </Col>
          <Col md={4} className="left-block">
            <KeyPersons />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeDetail;
