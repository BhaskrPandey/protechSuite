import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-employee-view-projects',
  templateUrl: './employee-view-projects.component.html',
  styleUrls: ['./employee-view-projects.component.css']
})
export class EmployeeViewProjectsComponent implements OnInit, AfterViewInit {

  selectedElement: any = {};

  displayedColumns: string[] = ['projectTitle', 'projectDescription', 'startDate', 'endDate', 'frontEndTechStack', 'backendTechStack', 'database', 'status'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectService: ProjectService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  ngAfterViewInit(): void {
    // Ensure the paginator and sort are set after the view initializes
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getAllProjects() {
    this.spinner.show();
    this.projectService.getAllProjects().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
