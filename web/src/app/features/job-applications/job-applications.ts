import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Service } from '@angular/core';
import { JobApplicationResponse } from './job-application-response';

@Service()
export class JobApplications {
  private readonly baseUrl = '/api/job-applications';

  listResource(): HttpResourceRef<JobApplicationResponse[] | undefined> {
    return httpResource<JobApplicationResponse[]>(() => this.baseUrl);
  }
}
