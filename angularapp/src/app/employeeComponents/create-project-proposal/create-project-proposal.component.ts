import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';

@Component({
  selector: 'app-create-project-proposal',
  templateUrl: './create-project-proposal.component.html',
  styleUrls: ['./create-project-proposal.component.css']
})
export class CreateProjectProposalComponent implements OnInit {

  proposalForm: FormGroup;
  proposalId: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProjectProposalService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService
  ) {
    this.proposalForm = this.fb.group({
      proposalTitle: ['', Validators.required],
      proposalDescription: ['', Validators.required],
      // status: ['', Validators.required],
      file: ['']
    });
    this.proposalId = null;
  }

  ngOnInit(): void {
    this.proposalId = this.route.snapshot.paramMap.get('id');
    if (this.proposalId) {
      this.spinner.show()
      this.proposalService.getProposalById(this.proposalId).subscribe((proposal) => {
        this.proposalForm.patchValue({
          proposalTitle: proposal.proposalTitle,
          proposalDescription: proposal.proposalDescription,
          // status: proposal.status,
          file: proposal.file// Assuming the file is stored as a string (e.g., URL or file name)

        });
      });
    }
    this.spinner.hide();
  }

  onSubmit(): void {
    if (true) {
      if (this.proposalId) {
        this.spinner.show();
        const formData = this.proposalForm.value;
        formData.userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage

        this.proposalService.updateProposal(this.proposalId, formData).subscribe(() => {
          this.toastr.success('Project Proposal updated Successfully!', 'Success')
          this.router.navigate(['viewProjectProposal']);
          this.spinner.hide();
        });
      } else {
        this.spinner.show();
        const formData = this.proposalForm.value;
        formData.userId = sessionStorage.getItem('id'); // Retrieve userId from sessionStorage

        this.proposalService.addProposal(formData).subscribe(() => {
          this.toastr.success('Project Proposal Added Successfully!', 'Success')
          this.router.navigate(['viewProjectProposal']);
          this.spinner.hide();
        });
      }
    }
  }

}

