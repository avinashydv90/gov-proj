import React from "react";

import ExcelTable from "./ExcelTable";
import { Container } from "react-bootstrap";

const AshramSchools: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">शासकीय आश्रमशाळा संपर्क क्रमांक</h2>
      <ExcelTable excelFilePath="/data/GovAshramSchool.xlsx" />
    </Container>
  );
};

export default AshramSchools;
