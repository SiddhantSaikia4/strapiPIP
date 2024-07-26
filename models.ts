// model.ts
export enum Colors {
  Red = 'Red',
  Green = 'Green',
  Amber = 'Amber',
}

export enum Goals {
  Yes = 'Yes',
  No = 'No',
  Partially = 'Partially'
}

export enum EmployeePosition {
  Junior = 'Junior',
  Senior = 'Senior',
}

export interface Contact {
  departmentName: string;
  rmgName: string;
  phoneNumber: string;
  email: string;
  employeeSignature: string;
  manager: string;
  evaluationProcess: string;
  improvementPlan: string;
  reportingGroup: string;
  reportingManagerSignature: string;
  resourceManagerSignature: string;
  slug: string;
}

export interface RagForm {
  date: string;
  color: Colors;
  goalsmet: Goals;
  day: string;
  actionsTaken: string;
  observations: string;
}

export interface Grade {
  java: string;
  javascript: string;
  Cplusplus: string;
}

export interface Appointment {
  id?: string;
  empname: string;
  date: string;
  position: EmployeePosition;
  contact: Contact;
  rag: RagForm[];
  grade: Grade;
}
