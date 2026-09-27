export type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Interviewing'
  | 'Rejected'
  | 'Offered'
  | 'Accepted'
  | 'Withdrawn'
  | 'NoLongerAvailable';

export type WorkEnvironment = 'InPerson' | 'Hybrid' | 'Remote';

export type EmploymentType = 'FullTime' | 'PartTime' | 'Contract' | 'Internship';

export type SalaryPeriod = 'Yearly' | 'Hourly';
