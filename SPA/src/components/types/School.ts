

export interface School {
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
  schoolTypeId: number;
  schoolType?: { id: number; type: string };
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;// exact match from backend

}

export interface SchoolRegistrationRequest {
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
  schoolTypeId: number;

  //type: "अनुदानित" | "बिनअनुदानित";
}


