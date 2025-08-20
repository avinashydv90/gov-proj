import React, { useState } from "react";
import PageLayout from "../../shared-components/PageLayout";
import {
  useDeleteStudentMutation,
  useGetStudentBySchoolIdQuery,
} from "../../services/studentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IsLoading from "../../Status/IsLoading";
import { useGetAllSchoolsQuery } from "../../services/schoolApi";
import { useGetAllCasteTypesQuery } from "../../services/StaffService/casteTypeApi";
import { useGetAllReligionTypesQuery } from "../../services/StaffService/religionTypeApi";
import { getCasteTypeNameById,  getNameById, getStandardNameById } from "../types/utility";
import { useGetAllDivisionsQuery } from "../../services/divisionApi";
import { useGetAllStandardsQuery } from "../../services/standardApi";
import ErrorMessage from "../../Status/IsError";
import { Division } from "../types/division";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
  Tooltip, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";




const StudentList: React.FC = () => {
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
  const schoolId = "f12ee097-5132-454f-9161-07564a3e9f88" // Replace with actual school ID
  const {
    data: studentsData,
    isLoading,
    isError,
    refetch,
  } = useGetStudentBySchoolIdQuery(schoolId);
    const { data: schoolsData } = useGetAllSchoolsQuery();
   
    const { data: divisionData } = useGetAllDivisionsQuery();
    const { data: standardData } = useGetAllStandardsQuery();
    const { data: casteTypeData } = useGetAllCasteTypesQuery();
    const { data: religionTypeData } = useGetAllReligionTypesQuery();

 
  const students = studentsData ?? [];
  const [deleteStudent] = useDeleteStudentMutation();


  const navigate = useNavigate();

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);

const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number
) => {
  setPage(newPage);
  console.log(event);
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0); // reset to first page
};


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id).unwrap();
        toast.success("Student deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete the student");
        console.error(err);
      }
    }
  };
console.log("division data:", divisionData);

const getDivisionNameById = (id: string, divisionData?: Division[]) => {
  const division = divisionData?.find(d => d.id === id);
  return division ? division.name : "";
};


 // Show loading state
  if (isLoading) {
    return (
      <PageLayout>
        <IsLoading isLoading message="Students लोड करत आहे..." />
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
   <div className="flex flex-col bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
      <h2 className="text-2xl font-bold mb-1 text-center text-[#5C4033]">
        विद्यार्थी यादी
      </h2>

      {/* Add Student Button */}
      <div className="flex justify-end mb-4">
        <AddCircleIcon
          onClick={() => navigate("/admin/add-student")}
          className="text-[#5C4033] cursor-pointer"
          fontSize="large"
        />
      </div>

      {/* Student Table */}
      <TableContainer  component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="student list table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  align={header === "कृती" ? "center" : "left"}
                   sx={{ fontSize: "1rem", fontWeight: "bold" 
                    ,  backgroundColor: "grey-500", // keep visible when sticky
          position: "sticky",
          top: 0,
          zIndex: 1,
                   }} // text-xl = 1.25rem
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

         <TableBody>
  {students
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // 🔹 only current page data
    .map((student, index) => (
      <TableRow key={student.id} hover>
        {/* Use correct serial number based on pagination */}
        <TableCell  sx={{ fontSize: "1rem"}}>{page * rowsPerPage + index + 1}</TableCell>
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
        <TableCell align="center">
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
            <IconButton onClick={() => handleDelete(student.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

        </Table>
         {/* 🔹 Pagination Component */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
    </div>
</PageLayout>

  );
};

export default StudentList;
