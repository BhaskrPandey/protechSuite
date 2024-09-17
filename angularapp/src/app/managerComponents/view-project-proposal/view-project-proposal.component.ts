import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';

interface Project {
  proposalTitle: string,
  proposalDescription: string,
  status: string
}

@Component({
  selector: 'app-view-project-proposal',
  templateUrl: './view-project-proposal.component.html',
  styleUrls: ['./view-project-proposal.component.css']
})
export class ViewProjectProposalComponent implements OnInit, AfterViewInit {
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  getAllProposals() {
    this.spinner.show();
    this.projectService.getAllProposals().subscribe((res) => {
      console.log('Proposals loaded:', res); // Log the loaded data
      this.dataSource = new MatTableDataSource(res);
      this.spinner.hide();
    });
  }
  
  updateStatus(element, status: string): void {
    const updatedProposal = { ...element, status: status };
    console.log(updatedProposal);
    this.projectService.updateProposalStatus(element._id, updatedProposal).subscribe(() => {
      this.getAllProposals();
    });
  }
  
  applyFilter(filterValue: string): void {
    console.log('Filter value:', filterValue); // Log the filter value
    const searchTerm = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Project, filter: string) => {
      return data.proposalTitle.toLowerCase().includes(searchTerm) || data.proposalDescription.toLowerCase().includes(searchTerm);
    };
    this.dataSource.filter = searchTerm;
  }
}
