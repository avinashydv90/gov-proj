import React, { useEffect, useState } from "react";
import PageLayout from "../../shared-components/PageLayout";
import {
  useDeleteStudentMutation,
  useGetStudentBySchoolIdQuery,
} from "../../services/studentApi";
import { useNavigate } from "react-router-dom";
import IsLoading from "../../Status/IsLoading";
import { useGetAllSchoolsQuery, useGetSchoolByIdQuery } from "../../services/schoolApi";
import { useGetAllCasteTypesQuery } from "../../services/StaffService/casteTypeApi";
import { useGetAllReligionTypesQuery } from "../../services/StaffService/religionTypeApi";
import { getCasteTypeNameById,  getNameById, getStandardNameById } from "../types/utility";
import { useGetAllDivisionsQuery } from "../../services/divisionApi";
import { useGetAllStandardsQuery } from "../../services/standardApi";
import ErrorMessage from "../../Status/IsError";
import { Division } from "../types/division";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
  Tooltip, IconButton,
  Stack,

} from "@mui/material";
import "../../constants/confirm-custom.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Filter from "../FilterComponent/Filter";
import StandardFilter from "../FilterComponent/StandardFilter";
import DivisionFilter from "../FilterComponent/DivisionFilter";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';  
import AppSnackbar from "../alert/AppSnackbar";
import { getSchoolIdFromToken } from "../../constants/authUtils";
import toMarathiNumber from "../../constants/toMarathiNumber";
import { getRoleFromToken } from "../../constants/roleUtils";

const StudentList: React.FC = () => {
 
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const role = getRoleFromToken();
  const decodedSchoolId = getSchoolIdFromToken();
  const { data: school ,isLoading : isSchoolLoading } = useGetSchoolByIdQuery(decodedSchoolId);
  const { data: schoolsData } = useGetAllSchoolsQuery();
    const headers = [
    "अ.क्र.",
    "विद्यार्थी नाव",
    "जन्मतारीख",
    "लिंग",
    "पत्ता",
    "जी.आर. क्रमांक",
    "पालकाचे नाव",
    "आईचे नाव",
    "संपर्क",
    "जात",
    "धर्म",
    "जात प्रकार",
    "धर्म प्रकार",
    "शाळा",
    "इयत्ता",    
    "विभाग",
    "कृती",
  ];
  
  const {
    data: studentsData,
    isLoading,
    isError,
    refetch
  } = useGetStudentBySchoolIdQuery(selectedSchool ?? "", { skip: !selectedSchool || !selectedStandard });

  const {
    data: standardData,
    isLoading: isStandardsLoading
  } = useGetAllStandardsQuery();

  const {
    data: divisionData,
    isLoading: isDivisionsLoading
  } = useGetAllDivisionsQuery();

  const { data: casteTypeData } = useGetAllCasteTypesQuery();
  const { data: religionTypeData } = useGetAllReligionTypesQuery(); 

  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate();

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);

useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

useEffect(() => {
  if (role !== "SuperAdmin" && school?.id) {
    setSelectedSchool(school.id);
  }
}, [school, role]);

const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number
) => {
  setPage(newPage);
  console.log(event);
};
const filteredStudents =
  (studentsData ?? []).filter(
    (student) =>
      (!selectedStandard || student.standardId === selectedStandard) &&
      (!selectedDivision || student.divisionId === selectedDivision)
  );

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0); 
};

const handleDelete = async (id: string) => {
  confirmAlert({
    title: "तुम्हाला हा विद्यार्थी हटवायचा आहे का?",
    message: "कृपया पुढे जाण्यासाठी पुष्टी करा.",
    buttons: [
      {
        label: "होय",
        onClick: async () => {
          try {
            await deleteStudent(id).unwrap();
            setAlertType("success");
            setAlertMessage("विद्यार्थी यशस्वीरित्या हटवला!");
            refetch();
          } catch (error) {
            setAlertType("error");
            setAlertMessage("विद्यार्थी हटवण्यात अडचण आली: " + (error as any).message);
          }
        }
      },
      {
        label: "नाही",
        onClick: () => {}
      }
    ]
  });
};
const filteredStandards = standardData?.filter(
  (s) => s.schoolId === selectedSchool
);

const filteredDivisions = divisionData?.filter(
  (d) => d.standardId === selectedStandard
);

const getDivisionNameById = (id: string, divisionData?: Division[]) => {
  const division = divisionData?.find(d => d.id === id);
  return division ? division.name : "";
};

 if (isLoading || isSchoolLoading || isStandardsLoading || isDivisionsLoading) {
    return (
      <PageLayout>
        <IsLoading isLoading message="विद्यार्थी लोड करत आहे..." />
      </PageLayout>
    );
  }

  // Show error state
  if (isError) {
    return (
      <PageLayout>
        <ErrorMessage
          isError
          title="अरेरे! काहीतरी चुकलं"
          message="कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा."
        />
      </PageLayout>
    );
  }
  return (
    
    <PageLayout>
     <div className="flex flex-col bg-gray-50 py-6 px-6 sm:px-4 md:px-6 mb-18">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
        विद्यार्थी यादी
      </h2>
       <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
      <div className="flex gap-4 mb-6">
<Filter
  schools={role === "SuperAdmin" ? schoolsData : school ? [school] : []}
  selectedSchool={
  selectedSchool
    ? (role === "SuperAdmin"
        ? schoolsData?.find((s) => s.id === selectedSchool)
        : school) ?? null
    : null
}
  onSchoolChange={(school) => {
    const id = school?.id ?? null;
    setSelectedSchool(id);
    setSelectedStandard(null);
    setSelectedDivision(null);
  }}
/>
<StandardFilter
  standards={filteredStandards}
  selectedSchoolId={selectedSchool ?? ""}
  value={selectedStandard}
  onStandardChange={(standard) => {
    const id = standard?.id ?? null;
    setSelectedStandard(id);
    setSelectedDivision(null);
  }}
/>
        <DivisionFilter
    divisions={filteredDivisions}
    selectedStandardId={selectedStandard ?? ""}
    value={selectedDivision}
    onDivisionChange={(division) =>
      setSelectedDivision(division?.id ?? null)
    }
  />
      </div>
         {/* Add Student Button */}
        {selectedSchool && (
          <div className="flex justify-end mb-4">
            <AddCircleIcon
              onClick={() => navigate("/admin/add-student")}
              className="text-[#5C4033] cursor-pointer"
              fontSize="large"
            />
          </div>
        )}

      {/* Student Table */}
      {(!selectedSchool || !selectedStandard) ? (
  <div className="text-center text-gray-500 italic font-semibold py-6">
    कृपया शाळा आणि इयत्ता निवडा.
  </div>
  ) : (
  <TableContainer  component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }} aria-label="student list table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  align={header === "कृती" ? "center" : "left"}
                   sx={{ fontSize: "1rem",
                    height:"40px",
                    padding: "0px 16px", fontWeight: "bold" 
                    ,  backgroundColor: "grey-400", 
          position: "sticky",
          top: 0,
          zIndex: 1,
                   }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

         <TableBody sx={{ backgroundColor: "white" ,height:"50px", padding: "0px 16px"}}>
  {filteredStudents.length === 0 ? (
    <TableRow>
      <TableCell colSpan={headers.length} align="center"
       sx={{ fontSize: "1rem", padding: "16px" , color: "#4D4949	" ,fontWeight: "bold", fontStyle: "italic" }}>
        कोणतेही विद्यार्थी आढळले नाहीत.
      </TableCell>
    </TableRow>
  ) : (filteredStudents
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
    .map((student, index) => (
      <TableRow key={student.id} hover>
        {/* Use correct serial number based on pagination */}
        <TableCell  sx={{ fontSize: "1rem"}}>{toMarathiNumber(page * rowsPerPage + index + 1)}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.fullName}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>
          {student.dateOfBirth
            ? new Date(student.dateOfBirth).toLocaleDateString()
            : ""}
        </TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.gender}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.address}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.grNumber}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.guardianName}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.motherName}</TableCell>
        <TableCell className="truncate max-w-[180px]">
          {student.contact}
        </TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.caste}</TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>{student.religion}</TableCell>
        <TableCell>
          {getCasteTypeNameById(student.casteTypeId, casteTypeData)}
        </TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>
          {getNameById(student.religionTypeId, religionTypeData)}
        </TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>
          {getNameById(student.schoolId, schoolsData)}
        </TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}>
          {getStandardNameById(student.standardId, standardData)}
        </TableCell>
        <TableCell  sx={{ fontSize: "1rem"}}
        >
          {getDivisionNameById(student.divisionId, divisionData)}
        </TableCell>
        <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
          <Stack direction="row" spacing={1} justifyContent="center"></Stack>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/admin/edit-student/${student.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete">
      <IconButton
        onClick={() => (handleDelete(student.id))    
        }
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
        </TableCell>
      </TableRow>
    )))}
</TableBody>

        </Table>
         {/* 🔹 Pagination Component */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
)}
     
    </div>
</PageLayout>

  );
};
export default StudentList;


