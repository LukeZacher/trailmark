import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { JobApplications } from '../job-applications';

@Component({
  imports: [RouterLink],
  selector: 'app-job-application-list',
  styleUrl: './job-application-list.scss',
  templateUrl: './job-application-list.html',
})
export class JobApplicationList {
  private readonly jobApplicationsService = inject(JobApplications);

  protected readonly jobApplications = this.jobApplicationsService.listResource();

  protected readonly pendingDeleteId = signal<number | null>(null);
  protected readonly deleteError = signal<string | null>(null);

  protected requestDelete(id: number): void {
    this.deleteError.set(null);
    this.pendingDeleteId.set(id);
  }

  protected cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  protected confirmDelete(id: number): void {
    this.jobApplicationsService
      .delete(id)
      .pipe(
        finalize(() => {
          this.pendingDeleteId.set(null);
        }),
      )
      .subscribe({
        next: () => {
          this.jobApplications.reload();
        },
        error: () => {
          this.deleteError.set('Could not delete the application. Please try again.');
        },
      });
  }
}
