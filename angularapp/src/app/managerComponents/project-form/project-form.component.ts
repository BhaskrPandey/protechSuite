import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
 
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {


  projectForm: FormGroup;
  projectId: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private spinner : NgxSpinnerService,
    private toaster : ToastrService
  ) {
    this.projectForm = this.fb.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      frontEndTechStack: ['', Validators.required],
      backendTechStack: ['', Validators.required],
      database: ['', Validators.required],
      status: ['planned', Validators.required]
    });
    this.projectId = null;
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.spinner.show()
      this.projectService.getProjectById(this.projectId).subscribe((project) => {
        this.projectForm.patchValue({
          projectTitle: project.projectTitle,
          projectDescription: project.projectDescription,
          startDate: project.startDate,
          endDate: project.endDate,
          frontEndTechStack: project.frontEndTechStack,
          backendTechStack: project.backendTechStack,
          database: project.database,
          status: project.status
        });
      });
    }
    this.spinner.hide()
  }

  onSubmit(): void {
    if (true) {
      this.spinner.show()
      if (this.projectId) {
        this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe(() => {
          this.toaster.success('Project Details Updated Successfully!', 'Success')
          this.router.navigate(['viewProject']);
          this.spinner.hide()
        });
      } else {
        this.projectService.addProject(this.projectForm.value).subscribe(() => {
          this.toaster.success('Project Details Added Successfully!', 'Success')
          this.router.navigate(['viewProject']);
          this.spinner.hide()
        });
      }
    }
  }
}
