import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateJobApplicationRequest } from './create-job-application-request';
import { JobApplicationResponse } from './job-application-response';

@Service()
export class JobApplications {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = '/api/job-applications';

  listResource(): HttpResourceRef<JobApplicationResponse[] | undefined> {
    return httpResource<JobApplicationResponse[]>(() => this.baseUrl);
  }

  create(request: CreateJobApplicationRequest): Observable<JobApplicationResponse> {
    return this.http.post<JobApplicationResponse>(this.baseUrl, request);
  }
}
