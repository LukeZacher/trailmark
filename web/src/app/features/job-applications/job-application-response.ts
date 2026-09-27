import {
  ApplicationStatus,
  EmploymentType,
  SalaryPeriod,
  WorkEnvironment,
} from './job-application-enums';

export interface JobApplicationResponse {
  id: number;
  jobTitle: string;
  employerName: string;
  applicationStatus: ApplicationStatus;

  jobPostingUrl: string | null;
  appliedOn: string | null;
  location: string | null;
  workEnvironment: WorkEnvironment | null;
  employmentType: EmploymentType | null;
  salaryPeriod: SalaryPeriod | null;
  minSalary: number | null;
  maxSalary: number | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;
}
