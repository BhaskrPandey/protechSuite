import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit, AfterViewInit {

  card = false;
  selectedElement: any = {};

  displayedColumns: string[] = ['projectTitle', 'projectDescription', 'startDate', 'endDate', 'frontEndTechStack', 'backendTechStack', 'database', 'status', 'action'];
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
      this.dataSource.filterPredicate = (data: Project, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        return data.projectTitle.toLowerCase().includes(transformedFilter) ||
               data.projectDescription.toLowerCase().includes(transformedFilter);
      };
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  deleteButton(element) {
    this.card = true;
    this.selectedElement = element;
  }

  editButton(id: number) {
    this.router.navigate(['/editProject', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete() {
    this.projectService.deleteProject(this.selectedElement._id).subscribe((res) => {
      console.log("Deleted Successfully");
      this.getAllProjects();
      this.close();
    });
  }

  close() {
    this.card = false;
    this.selectedElement = {};
  }
}
