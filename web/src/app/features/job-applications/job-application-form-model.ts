import { CreateJobApplicationRequest } from './create-job-application-request';
import {
  ApplicationStatus,
  EmploymentType,
  SalaryPeriod,
  WorkEnvironment,
} from './job-application-enums';
import { JobApplicationResponse } from './job-application-response';
import { UpdateJobApplicationRequest } from './update-job-application-request';

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

export function toJobApplicationFormModel(
  response: JobApplicationResponse,
): JobApplicationFormModel {
  return {
    jobTitle: response.jobTitle,
    employerName: response.employerName,
    applicationStatus: response.applicationStatus,
    jobPostingUrl: response.jobPostingUrl ?? '',
    appliedOn: response.appliedOn ?? '',
    location: response.location ?? '',
    workEnvironment: response.workEnvironment ?? '',
    employmentType: response.employmentType ?? '',
    salaryPeriod: response.salaryPeriod ?? '',
    minSalary: response.minSalary,
    maxSalary: response.maxSalary,
    notes: response.notes ?? '',
  };
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

export function toUpdateJobApplicationRequest(
  model: JobApplicationFormModel,
): UpdateJobApplicationRequest {
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
