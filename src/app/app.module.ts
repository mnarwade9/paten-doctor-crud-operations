import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorPatientService } from './service/common-util.service';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import {MatCardModule} from '@angular/material/card';
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    DoctorComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    // Material Modules for Datatable, List and Buttons
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule
  ],
  providers: [DoctorPatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
