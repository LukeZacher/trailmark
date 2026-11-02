// ApplicationStatus
export const APPLICATION_STATUSES = [
  'Saved',
  'Applied',
  'Interviewing',
  'Rejected',
  'Offered',
  'Accepted',
  'Withdrawn',
  'NoLongerAvailable',
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  Saved: 'Saved',
  Applied: 'Applied',
  Interviewing: 'Interviewing',
  Rejected: 'Rejected',
  Offered: 'Offered',
  Accepted: 'Accepted',
  Withdrawn: 'Withdrawn',
  NoLongerAvailable: 'No longer available',
};

// WorkEnvironment
export const WORK_ENVIRONMENTS = ['InPerson', 'Hybrid', 'Remote'] as const;

export type WorkEnvironment = (typeof WORK_ENVIRONMENTS)[number];

export const WORK_ENVIRONMENT_LABELS: Record<WorkEnvironment, string> = {
  InPerson: 'In person',
  Hybrid: 'Hybrid',
  Remote: 'Remote',
};

// EmploymentType
export const EMPLOYMENT_TYPES = ['FullTime', 'PartTime', 'Contract', 'Internship'] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  FullTime: 'Full-time',
  PartTime: 'Part-time',
  Contract: 'Contract',
  Internship: 'Internship',
};

// SalaryPeriod
export const SALARY_PERIODS = ['Yearly', 'Hourly'] as const;

export type SalaryPeriod = (typeof SALARY_PERIODS)[number];

export const SALARY_PERIOD_LABELS: Record<SalaryPeriod, string> = {
  Yearly: 'Yearly',
  Hourly: 'Hourly',
};
