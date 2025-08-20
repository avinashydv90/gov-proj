

export interface ISchool {
  id: string;
  schoolCode: string;
  clusterCode: string;
  name: string;
  address: string;
  city: string;
  district: string;
  pinCode: string;
  state: string;
  email: string;
  phoneNumber: string;
  lowerStandard: number;
  higherStandard: number;
  establishMentDate: string;
  schoolTypeId: string;

}

export interface ISchoolRegistrationRequest {
  id?: string;
  schoolCode: string;
  clusterCode: string;
  name: string;
  address: string;
  city: string;
  district: string;
  pinCode: string;
  state: string;
  email: string;
  phoneNumber: string;
  lowerStandard: number;
  higherStandard: number;
  establishMentDate: string;
  schoolTypeId: string;
}
export interface ISchoolUpdationRequest {
  id: string;
  schoolCode: string;
  clusterCode: string;
  name: string;
  address: string;
  city: string;
  district: string;
  pinCode: string;
  state: string;
  email: string;
  phoneNumber: string;
  lowerStandard: number;
  higherStandard: number;
  establishMentDate: string;
  schoolTypeId: string;
}

