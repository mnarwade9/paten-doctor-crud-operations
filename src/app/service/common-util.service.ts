import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Patient } from '../model/patient';
import { Doctor } from '../model/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorPatientService {
  patientData: any;
  doctorData: any;
  baseUrl = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getPatientDetails(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl + 'patients')
    .pipe(retry(1), catchError(handleError));
  }
  addPatient(patient: any): Observable<Patient> {
    console.log("call to post data =" + JSON.stringify(patient));
    return this.httpClient.post<Patient>(this.baseUrl + 'patients/', JSON.stringify(patient), this.httpOptions);
  }
  updatePatient(id: number, patient: any): Observable<Patient> {
    return this.httpClient.put<Patient>(this.baseUrl + 'patients/' + id, JSON.stringify(patient), this.httpOptions);
  }
  deletePatient(id:number){
    return this.httpClient.delete<Patient>(this.baseUrl + 'patients/' + id, this.httpOptions);
   }
  getDoctorDetails(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(this.baseUrl + 'doctors')
    .pipe(retry(1), catchError(handleError));
  }
  addDoctor(doctor: any): Observable<Doctor> {
    console.log("call to post doctor data =" + JSON.stringify(doctor));
    return this.httpClient.post<Doctor>(this.baseUrl + 'doctors/', JSON.stringify(doctor), this.httpOptions);
  }
  updateDoctor(id: number, doctor: any): Observable<Doctor> {
    return this.httpClient.put<Doctor>(this.baseUrl + 'doctors/' + id, JSON.stringify(doctor), this.httpOptions);
  }
  deleteDoctor(id:number){
    return this.httpClient.delete<Doctor>(this.baseUrl + 'doctors/' + id, this.httpOptions);
   }
}
function handleError(error:any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(() => {
      return errorMessage;
  });
}

