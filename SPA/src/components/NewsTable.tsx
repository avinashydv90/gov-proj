import React from "react";
import { Table } from "react-bootstrap";

const newsData = [
  {
    id: 1,
    title:
      "एकलव्य रेसिडेन्शिअल स्कूल, शेंडेगाव येथे क्रीडा स्पर्धांचा शुभारंभ 2023-24",
  },
  {
    id: 2,
    title:
      "प्रधानमंत्री आदिवासी न्याय महाअभियान (PM-JANMAN) अंतर्गत शासकीय योजनांचा मेळावा",
  },
  {
    id: 3,
    title:
      'एकात्मिक आदिवासी विकास प्रकल्प अंतर्गत "न्यूक्लिअस बजेट योजना" लाभार्थी यशोगाथा',
  },
  {
    id: 4,
    title:
      "मुख्याध्यापक, शिक्षक यांच्यासाठी एकदिवसीय उदबोधन कार्यशाळा 29/10/2023",
  },
  { id: 5, title: "विषबाधेच्या विद्यार्थ्यांसाठी आश्रमशाळेत मदत योजना" },
  { id: 6, title: "रक्तदान शिबीराचे आयोजन आणि 47 कर्मचाऱ्यांचे रक्तदान" },
  { id: 7, title: "शाळा प्रवेशोत्सव महोत्सव - विद्यार्थ्यांचे अनोखे स्वागत" },
  {
    id: 8,
    title:
      "एकलव्य रेसिडेन्शिअल स्कूल, शेंडेगाव येथे क्रीडा स्पर्धांचा शुभारंभ 2024-25",
  },
];

const NewsTable = () => {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>बातमी शीर्षक</th>
        </tr>
      </thead>
      <tbody>
        {newsData.map((news) => (
          <tr key={news.id}>
            <td>{news.id}</td>
            <td>{news.title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NewsTable;
