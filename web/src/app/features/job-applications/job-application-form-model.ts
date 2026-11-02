import { CreateJobApplicationRequest } from './create-job-application-request';
import {
  ApplicationStatus,
  EmploymentType,
  SalaryPeriod,
  WorkEnvironment,
} from './job-application-enums';

export interface JobApplicationFormModel {
  jobTitle: string;
  employerName: string;
  applicationStatus: ApplicationStatus;
  jobPostingUrl: string;
  appliedOn: string;
  location: string;
  workEnvironment: WorkEnvironment | '';
  employmentType: EmploymentType | '';
  salaryPeriod: SalaryPeriod | '';
  minSalary: number | null;
  maxSalary: number | null;
  notes: string;
}

export function toCreateJobApplicationRequest(
  model: JobApplicationFormModel,
): CreateJobApplicationRequest {
  return {
    jobTitle: model.jobTitle,
    employerName: model.employerName,
    applicationStatus: model.applicationStatus,
    jobPostingUrl: model.jobPostingUrl || null,
    appliedOn: model.appliedOn || null,
    location: model.location || null,
    workEnvironment: model.workEnvironment || null,
    employmentType: model.employmentType || null,
    salaryPeriod: model.salaryPeriod || null,
    minSalary: model.minSalary,
    maxSalary: model.maxSalary,
    notes: model.notes || null,
  };
}
