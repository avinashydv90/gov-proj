import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import * as XLSX from "xlsx";

interface ExcelTableProps {
  excelFilePath: string; // Excel file path as a prop
}

const ExcelTable: React.FC<ExcelTableProps> = ({ excelFilePath }) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [filterColumn, setFilterColumn] = useState<string>(""); // Column to filter by

  // const readExcelFile = async () => {
  //   try {
  //     console.log(`Fetching Excel file from: ${excelFilePath}...`);
  //     const response = await fetch(excelFilePath);
  //     if (!response.ok) throw new Error("Failed to fetch Excel file");

  //     const arrayBuffer = await response.arrayBuffer();
  //     console.log("Excel file loaded successfully!");

  //     const workbook = XLSX.read(arrayBuffer, { type: "array" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];

  //     const rawData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //     console.log("Raw Excel Data:", rawData);

  //     if (rawData.length < 2) {
  //       throw new Error("Excel file does not have enough rows.");
  //     }

  //     const headers: string[] = rawData[1].map(
  //       (header) => header?.toString().trim().replace(/\s+/g, " ") || ""
  //     );

  //     console.log("Extracted Headers:", headers);

  //     const jsonData = rawData.slice(2).map((row, index) => {
  //       let obj: any = { id: index + 1 };

  //       headers.forEach((header, colIndex) => {
  //         obj[header] = row[colIndex] || "";
  //       });

  //       return obj;
  //     });

  //     console.log("Parsed JSON Data:", jsonData);

  //     setData(jsonData);
  //     setFilteredData(jsonData);

  //     if (headers.includes("तालुका")) {
  //       setFilterColumn("तालुका"); // Set default filter column
  //       const uniqueValues = [
  //         ...new Set(jsonData.map((item) => item["तालुका"]).filter(Boolean)),
  //       ];
  //       setFilterOptions(uniqueValues);
  //     }
  //   } catch (error) {
  //     console.error("Error reading Excel file:", error);
  //   }
  // };

  const readExcelFile = async () => {
    try {
      console.log(`Fetching Excel file from: ${excelFilePath}...`);
      const response = await fetch(excelFilePath);
      if (!response.ok) throw new Error("Failed to fetch Excel file");

      const arrayBuffer = await response.arrayBuffer();
      console.log("Excel file loaded successfully!");

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rawData: any[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
      });

      console.log("Raw Excel Data:", rawData);

      if (rawData.length < 2) {
        throw new Error("Excel file does not have enough rows.");
      }

      // ✅ Extract headers from the second row
      let headers: string[] = rawData[1].map((header) =>
        header ? header.toString().trim() : ""
      );

      // ✅ Handle duplicate column names by appending _1, _2, etc.
      const headerMap = new Map<string, number>();
      headers = headers.map((header) => {
        if (headerMap.has(header)) {
          const count = headerMap.get(header)! + 1;
          headerMap.set(header, count);
          return `${header}_${count}`;
        } else {
          headerMap.set(header, 1);
          return header;
        }
      });

      console.log("Processed Headers:", headers);

      // ✅ Read all data from rawData[2] onwards
      const jsonData = rawData.slice(2).map((row, index) => {
        let obj: any = { id: index + 1 };
        headers.forEach((header, colIndex) => {
          obj[header] = row[colIndex] || "";
        });
        return obj;
      });

      console.log("Parsed JSON Data:", jsonData);

      setData(jsonData);
      setFilteredData(jsonData);

      if (headers.includes("तालुका")) {
        setFilterColumn("तालुका"); // Set default filter column
        const uniqueValues = [
          ...new Set(jsonData.map((item) => item["तालुका"]).filter(Boolean)),
        ];
        setFilterOptions(uniqueValues);
      }
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  };

  useEffect(() => {
    readExcelFile();
  }, [excelFilePath]);

  useEffect(() => {
    if (selectedFilter && filterColumn) {
      setFilteredData(
        data.filter((item) => item[filterColumn] === selectedFilter)
      );
    } else {
      setFilteredData(data);
    }
  }, [selectedFilter, filterColumn, data]);

  return (
    <div>
      {filterOptions.length > 0 && (
        <Form.Group controlId="filterDropdown" className="drop-downstyle">
          <Form.Label>Filter by {filterColumn}:</Form.Label>
          <Form.Select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0])
                .filter((key) => key !== "id")
                .map((key, index) => <th key={index}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              {Object.keys(item)
                .filter((key) => key !== "id")
                .map((key, index) => (
                  <td key={index}>{item[key]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExcelTable;
