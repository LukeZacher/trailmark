import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobApplicationList } from './job-application-list';

describe('JobApplicationList', () => {
  let component: JobApplicationList;
  let fixture: ComponentFixture<JobApplicationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationList],
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
