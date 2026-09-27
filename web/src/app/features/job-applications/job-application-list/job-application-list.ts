import { Component, inject } from '@angular/core';
import { JobApplications } from '../job-applications';

@Component({
  imports: [],
  selector: 'app-job-application-list',
  styleUrl: './job-application-list.scss',
  templateUrl: './job-application-list.html',
})
export class JobApplicationList {
  private readonly jobApplicationsService = inject(JobApplications);

  protected readonly jobApplications = this.jobApplicationsService.listResource();
}
