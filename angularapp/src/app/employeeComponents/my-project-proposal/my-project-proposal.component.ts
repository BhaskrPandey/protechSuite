import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

interface Proposal {
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-my-project-proposal',
  templateUrl: './my-project-proposal.component.html',
  styleUrls: ['./my-project-proposal.component.css']
})
export class MyProjectProposalComponent implements OnInit {

  card = false;
  selectedElement: any = {};

  displayedColumns: string[] = ['proposalTitle', 'proposalDescription', 'status', 'action'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectService: ProjectProposalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllProposals();
  }

  ngAfterViewInit(): void {
    this.getAllProposals();
  }

  getAllProposals() {
    this.spinner.show();
    this.projectService.getAllProposals().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.spinner.hide();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByStatus(event) {
    const filterValue = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteButton(element) {
    this.card = true;
    this.selectedElement = element;
  }

  editButton(id: number) {
    this.router.navigate(['/editProposal', id]);
  }

  delete() {
    this.projectService.deleteProposal(this.selectedElement._id).subscribe((res) => {
      console.log("Deleted Successfully");
      this.getAllProposals();
      this.close();
    });
  }

  close() {
    this.card = false;
    this.selectedElement = {};
  }
}
