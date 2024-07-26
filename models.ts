export interface Appointment {
  grade: any;
  // hrSignature: ReactNode;
  id?: string;
  empname: string;
  date: string;
  position: EmployeePosition;
  rag : RagForm;
  description?: string;
  contact: ContactInfo;
  // pets: Pet[];
  // departmentInfo: DepartmentForm[]
}

export interface ContactInfo {
  departmentName: any;
  employeeSignature: any;
  evaluationProcess: any;
  improvementPlan: any;
  manager: any;
  reportingManagerSignature: any;
  slug: any;
  resourceManagerSignature: any;
  reportingGroup: string;
  rmgName: string;
  phoneNumber: string;
  email?: string;
  // callMeBack?: boolean;
}

export interface RagForm{
  day: string;
  actionsTaken: string;
  observations: string;
  date: string;
  color: Colors;
  goalsmet: Goals;
}

// export interface DepartmentForm {
//   depName: string;
//   evaluationProcess: string;
// }

export interface Pet {
  name: string;
  breed: string;
  description?: string;
}

export enum EmployeePosition {
  // Basic = "Basic",
  // Premium = "Premium",
  Senior = "Senior Manager",
  Junior = "Software Engineer",
  Asociate = "Asociate Engineer",
}

export enum Goals {
  Yes = "Yes",
  No = "No",
  Partially = "Partially",
}

export enum Colors {
  Green = "Green" ,
  Amber ="Amber" ,
  Red="Red",
}