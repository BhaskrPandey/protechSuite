import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ProjectFormComponent } from './managerComponents/project-form/project-form.component';
import { ViewProjectComponent } from './managerComponents/view-project/view-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'
import { CreateProjectProposalComponent } from './employeeComponents/create-project-proposal/create-project-proposal.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyProjectProposalComponent } from './employeeComponents/my-project-proposal/my-project-proposal.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { ManagerNavbarComponent } from './managerComponents/manager-navbar/manager-navbar.component'
import { ViewProjectProposalComponent } from './managerComponents/view-project-proposal/view-project-proposal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeNavbarComponent } from './employeeComponents/employee-navbar/employee-navbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { EmployeeViewProjectsComponent } from './employeeComponents/employee-view-projects/employee-view-projects.component';
import { EmployeeHomeComponent } from './employeeComponents/employee-home/employee-home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    ViewProjectComponent,
    LoginComponent,
    SignupComponent,
    MyProjectProposalComponent,
    HomePageComponent,
    ErrorPageComponent,
    ViewProjectProposalComponent,
    ManagerNavbarComponent,
    CreateProjectProposalComponent,
    EmployeeNavbarComponent,
    EmployeeViewProjectsComponent,
    EmployeeHomeComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],

  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule{}

