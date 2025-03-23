import React from "react";

import ExcelTable from "./ExcelTable";
import { Container } from "react-bootstrap";

const GovHostels: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        शासकीय आदिवासी मुला मुलींचे वसतिगृह संपर्क क्रमांक
      </h2>
      <ExcelTable excelFilePath="/data/GovHostel.xlsx" />
    </Container>
  );
};

export default GovHostels;
