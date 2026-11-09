import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  maxLength,
  min,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { finalize, firstValueFrom } from 'rxjs';

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
  toJobApplicationFormModel,
  toUpdateJobApplicationRequest,
} from '../job-application-form-model';
import { JobApplications } from '../job-applications';

@Component({
  imports: [FormRoot, FormField, FieldError, RouterLink],
  selector: 'app-job-application-form',
  styleUrl: './job-application-form.scss',
  templateUrl: './job-application-form.html',
})
export class JobApplicationForm implements OnInit {
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

  protected readonly id = input<number | undefined, string | undefined>(undefined, {
    transform: (value) => (value ? Number(value) : undefined),
  });

  protected readonly isLoading = signal(false);
  protected readonly serverError = signal<string | null>(null);
  protected readonly loadError = signal<string | null>(null);

  protected readonly creating = computed(() => {
    return this.id() === undefined;
  });
  protected readonly submitLabel = computed(() => {
    if (this.jobApplicationForm().submitting()) {
      return this.creating() ? 'Creating...' : 'Saving...';
    }

    return this.creating() ? 'Create' : 'Save';
  });

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

      maxLength(schema.jobPostingUrl, 2000, { message: 'URL must be 2000 characters or fewer.' });
      pattern(schema.jobPostingUrl, /^https?:\/\/.+/i, {
        message: 'Enter a URL starting with http:// or https://.',
      });
      maxLength(schema.location, 200, { message: 'Location must be 200 characters or fewer.' });

      maxLength(schema.notes, 5000, { message: 'Notes must be 5000 characters or fewer.' });

      min(schema.minSalary, 0, { message: 'Minimum salary cannot be negative.' });

      min(schema.maxSalary, 0, { message: 'Maximum salary cannot be negative.' });
      validate(schema.maxSalary, ({ value, valueOf }) => {
        const maxValue = value();
        const minValue = valueOf(schema.minSalary);

        if (minValue === null || maxValue === null) {
          return null;
        }

        if (maxValue < minValue) {
          return {
            kind: 'salaryRange',
            message: 'Max salary must be at least the minimum salary.',
          };
        }

        return null;
      });

      validate(schema.appliedOn, ({ value }) => {
        if (!value()) {
          return null;
        }

        const now = new Date();
        const earliest = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
        const latest = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        const applied = new Date(value());

        if (applied < earliest || applied > latest) {
          return {
            kind: 'appliedOnRange',
            message: 'Applied date must be within the last 5 years or the next year.',
          };
        }

        return null;
      });
    },
    {
      submission: {
        action: async () => {
          this.serverError.set(null);

          try {
            const id = this.id();

            if (id === undefined) {
              await firstValueFrom(
                this.jobApplicationsService.create(toCreateJobApplicationRequest(this.model())),
              );
            } else {
              await firstValueFrom(
                this.jobApplicationsService.update(id, toUpdateJobApplicationRequest(this.model())),
              );
            }

            await this.router.navigateByUrl('/job-applications');
          } catch (error) {
            this.serverError.set('Could not save your job application. Please try again later.');
            console.error(error);
          }
        },
      },
    },
  );

  ngOnInit(): void {
    const id = this.id();

    if (id === undefined) {
      return;
    }

    this.isLoading.set(true);

    this.jobApplicationsService
      .getById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.model.set(toJobApplicationFormModel(response));
        },
        error: () => this.loadError.set('Could not load this application.'),
      });
  }
}
