import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerNavbarComponent } from './managerComponents/manager-navbar/manager-navbar.component';
import { EmployeeNavbarComponent } from './employeeComponents/employee-navbar/employee-navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProjectFormComponent } from './managerComponents/project-form/project-form.component';
import { ViewProjectComponent } from './managerComponents/view-project/view-project.component';
import { CreateProjectProposalComponent } from './employeeComponents/create-project-proposal/create-project-proposal.component';
import { MyProjectProposalComponent } from './employeeComponents/my-project-proposal/my-project-proposal.component';
import { EmployeeViewProjectsComponent } from './employeeComponents/employee-view-projects/employee-view-projects.component';
import { EmployeeHomeComponent } from './employeeComponents/employee-home/employee-home.component';
import { ViewProjectProposalComponent } from './managerComponents/view-project-proposal/view-project-proposal.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    component : SignupComponent
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    // canActivate: [AuthGuard],
    // data: {role: "admin"}
  },
  {
    path: 'addProject',
    component: ProjectFormComponent,
    // canActivate: [AuthGuard],
    // data: {role: "admin"}
  },
  {
    path : 'viewProject',
    component: ViewProjectComponent,
    // canActivate: [AuthGuard],
    // data: {role: "admin"}
  },
  {
    path : 'editProject/:id',
    component : ProjectFormComponent,
    // canActivate: [AuthGuard],
    // data: {role: "admin"}
  },
  {
    path : 'editProposal/:id',
    component: CreateProjectProposalComponent,
    // canActivate: [AuthGuard],
    // data: {role: "admin"}
  },
  {
    path: 'proposals',
    component: ViewProjectProposalComponent,
    // canActivate: [AuthGuard],
    // data: {role: "admin"}
  },
  {
    path: 'employee',
    component: EmployeeNavbarComponent
  },
  {
    path : 'empHome',
    component: EmployeeHomeComponent,
    // canActivate: [AuthGuard],
    // data: {role: "user"}
  },
  {
    path : 'manager',
    component: ManagerNavbarComponent,
    // canActivate: [AuthGuard],
    // data: {role: "user"}
  },
  {
    path : 'addProjectProposal',
    component: CreateProjectProposalComponent,
    canActivate: [AuthGuard],
    data: {role: "user"}
  },
  {
    path : 'viewProjectProposal',
    component: MyProjectProposalComponent,
    // canActivate: [AuthGuard],
    // data: {role: "user"}
  },
  {
    path : 'projects',
    component: EmployeeViewProjectsComponent,
    // canActivate: [AuthGuard],
    // data: {role: "user"}
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }