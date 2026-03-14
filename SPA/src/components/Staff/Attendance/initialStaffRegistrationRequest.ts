
import { IStaff } from "../../types/IStaff"
import { getSchoolIdFromToken } from "../../../constants/authUtils";

const decodedSchoolId = getSchoolIdFromToken();

const initialStaffRegistrationRequest: IStaff = {
    id: "",
    name: "",
    qualification: "",
    subject: "",
    joiningDate: "",
    gender: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    minimumStandard: "",
    maximumStandard: "",
    dateOfBirth: "",
    caste: "",
    religion: "",
    employeeTypeId: "",
    staffTypeId: "",
    userId: "",
    schoolId: decodedSchoolId || "",
    religionTypeId: "",
    casteTypeId: "",

}

export default initialStaffRegistrationRequest
