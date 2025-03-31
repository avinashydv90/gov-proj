import { Container, Row, Col, Card } from "react-bootstrap";

const keyPersons = [
  {
    id: 1079,
    name: "श्री. देवेंद्र फडणवीस",
    designation: "माननीय मुख्यमंत्री, महाराष्ट्र राज्य",
    image: "cm.jpg",
  },
  {
    id: 1080,
    name: "श्री. एकनाथ शिंदे",
    designation: "माननीय उपमुख्यमंत्री, महाराष्ट्र राज्य",
    image: "cm.jpg",
  },
  {
    id: 1081,
    name: "श्री. अजित पवार",
    designation: "माननीय उपमुख्यमंत्री, महाराष्ट्र राज्य",
    image: "cm.jpg",
  },
  {
    id: 1082,
    name: "श्री. अशोक रामजी उईके",
    designation: "मा. मंत्री, आदिवासी विकास",
    image: "cm.jpg",
  },
  {
    id: 1083,
    name: "श्री. इंद्रनील मनोहरराव नाईक",
    designation: "मा. राज्यमंत्री, आदिवासी विकास विभाग",
    image: "cm.jpg",
  },
  {
    id: 1073,
    name: "श्री. विजय वाघमारे (भा.प्र.से)",
    designation: "सचिव, आदिवासी विकास विभाग",
    image: "cm.jpg",
  },
];

const KeyPersons = () => {
  return (
    <Container>
      <Row>
        <Col md={12} sm={12}>
          <div className="keyPerson">
            <h2 style={{ backgroundColor: "beige", textAlign: "center" }}>
              महत्वाच्या व्यक्ती
            </h2>
            <div className="contentArea">
              {keyPersons.map((person) => (
                // <Card key={person.id} className="mb-3">
                //   <Row className="g-0 align-items-center">
                //     <Col>
                //       <Card.Img
                //         src={`/images/${person.image}`}
                //         alt={person.name}
                //         className="img-fluid"
                //       />
                //     </Col>
                //     <Col>
                //       <Card.Body>
                //         <Card.Title>{person.name}</Card.Title>
                //         <Card.Text>{person.designation}</Card.Text>
                //       </Card.Body>
                //     </Col>
                //   </Row>
                // </Card>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "10px",
                    alignItems: "center",
                    borderRadius: "0px",
                  }}
                >
                  <Card.Img
                    variant="left"
                    src={`/images/${person.image}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <Card.Body
                    style={{
                      padding: "0px 10px 0px 10px",
                    }}
                  >
                    {/* <blockquote className="blockquote mb-0">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <footer className="blockquote-footer">
                        Someone famous in{" "}
                        <cite title="Source Title">Source Title</cite>
                      </footer>
                    </blockquote> */}
                    <Card.Title
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      {person.name}
                      <br />
                      {person.designation}
                    </Card.Title>
                    {/* <Card.Text>{person.designation}</Card.Text> */}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default KeyPersons;
