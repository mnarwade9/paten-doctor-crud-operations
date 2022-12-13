import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
