import { jwtDecode } from "jwt-decode";

export const getSchoolIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    console.log("Decoded token:", decoded);
    return decoded.schoolId;
};