import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaHome, FaBuilding, FaGraduationCap, FaUsers } from "react-icons/fa";

const homeBoxes = [
  {
    id: 1,
    icon: <FaHome />,
    text: "आश्रम शाळा",
    link: "#",
    modalTarget: "#myModalAshramshala",
  },
  {
    id: 2,
    icon: <FaBuilding />,
    text: "वसतिगृहे",
    link: "/1137/Hostel",
  },
  {
    id: 3,
    icon: <FaGraduationCap />,
    text: "शिष्यवृत्ती",
    link: "/1136/Scholarship",
  },
  {
    id: 4,
    icon: <FaUsers />,
    text: "एफ .ए .स",
    link: "http://fundallocation.mahaonlinegov.in/",
    external: true,
    modalTarget: "#myModalTribalSubPlan",
  },
];

const DetailLink = () => {
  return (
    <Container className="mt-4">
      <Row className="homeBoxContainer">
        {homeBoxes.map((box) => (
          <Col sm={6} md={6} key={box.id} style={{ marginBottom: "10px" }}>
            <Card className="homeBox text-center p-3">
              <Card.Body>
                <span className="icon">{box.icon}</span>
                {box.external ? (
                  <a href={box.link} target="_blank" rel="noopener noreferrer">
                    {box.text}
                  </a>
                ) : (
                  <a
                    href={box.link}
                    data-toggle={box.modalTarget ? "modal" : undefined}
                    data-target={box.modalTarget}
                  >
                    {box.text}
                  </a>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DetailLink;
