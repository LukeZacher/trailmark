import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, maxLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { FieldError } from '../../../shared/field-error/field-error';
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
  EMPLOYMENT_TYPES,
  EMPLOYMENT_TYPE_LABELS,
  SALARY_PERIODS,
  SALARY_PERIOD_LABELS,
  WORK_ENVIRONMENTS,
  WORK_ENVIRONMENT_LABELS,
} from '../job-application-enums';
import {
  JobApplicationFormModel,
  toCreateJobApplicationRequest,
} from '../job-application-form-model';
import { JobApplications } from '../job-applications';

@Component({
  imports: [FormRoot, FormField, FieldError, RouterLink],
  selector: 'app-job-application-form',
  styleUrl: './job-application-form.scss',
  templateUrl: './job-application-form.html',
})
export class JobApplicationForm {
  private readonly router = inject(Router);
  private readonly jobApplicationsService = inject(JobApplications);

  protected readonly applicationStatuses = APPLICATION_STATUSES;
  protected readonly applicationStatusLabels = APPLICATION_STATUS_LABELS;
  protected readonly employmentTypes = EMPLOYMENT_TYPES;
  protected readonly employmentTypeLabels = EMPLOYMENT_TYPE_LABELS;
  protected readonly salaryPeriods = SALARY_PERIODS;
  protected readonly salaryPeriodLabels = SALARY_PERIOD_LABELS;
  protected readonly workEnvironments = WORK_ENVIRONMENTS;
  protected readonly workEnvironmentLabels = WORK_ENVIRONMENT_LABELS;

  protected readonly serverError = signal<string | null>(null);

  private readonly model = signal<JobApplicationFormModel>({
    jobTitle: '',
    employerName: '',
    applicationStatus: 'Saved',
    jobPostingUrl: '',
    appliedOn: '',
    location: '',
    workEnvironment: '',
    employmentType: '',
    salaryPeriod: '',
    minSalary: null,
    maxSalary: null,
    notes: '',
  });

  protected readonly jobApplicationForm = form(
    this.model,
    (schema) => {
      required(schema.jobTitle, { message: 'Job title is required.' });
      maxLength(schema.jobTitle, 200, { message: 'Job title must be 200 characters or fewer.' });
      required(schema.employerName, { message: 'Employer is required.' });
      maxLength(schema.employerName, 200, {
        message: 'Employer name must be 200 characters or fewer.',
      });
    },
    {
      submission: {
        action: async () => {
          this.serverError.set(null);

          try {
            await firstValueFrom(
              this.jobApplicationsService.create(toCreateJobApplicationRequest(this.model())),
            );
            await this.router.navigateByUrl('/job-applications');
          } catch (error) {
            this.serverError.set(
              'An error occurred creating your job application. Please try again later.',
            );
            console.error(error);
          }
        },
      },
    },
  );
}
