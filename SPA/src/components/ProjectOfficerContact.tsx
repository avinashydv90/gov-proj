import React from "react";

import ExcelTable from "./ExcelTable";
import { Container } from "react-bootstrap";

const ProjectOfficerContact: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        प्रकल्प कार्यालय शहापूर अधिकारी संपर्क क्रमांक{" "}
      </h2>
      <ExcelTable excelFilePath="/data/ProjectOfficeContact.xlsx" />
    </Container>
  );
};

export default ProjectOfficerContact;
