import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateJobApplicationRequest } from './create-job-application-request';
import { JobApplicationResponse } from './job-application-response';
import { UpdateJobApplicationRequest } from './update-job-application-request';

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

  getById(id: number): Observable<JobApplicationResponse> {
    return this.http.get<JobApplicationResponse>(`${this.baseUrl}/${id}`);
  }

  update(id: number, request: UpdateJobApplicationRequest): Observable<JobApplicationResponse> {
    return this.http.put<JobApplicationResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
