import React from "react";

import ExcelTable from "./ExcelTable";
import { Container } from "react-bootstrap";

const AidedAshramSchool: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">अनुदानित आश्रमशाळा संपर्क क्रमांक</h2>
      <ExcelTable excelFilePath="/data/AidedAshramSchool.xlsx" />
    </Container>
  );
};

export default AidedAshramSchool;
