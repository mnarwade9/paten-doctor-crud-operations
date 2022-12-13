import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../model/patient';
import { DoctorPatientService } from "../service/common-util.service";
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  displayPatientColumns: string[] = ['id', 'name', 'gender', 'phone', 'address', 'doctorname', 'actions'];
  patientDetails: any = [];
  dataSource : any = [];
  doctorDetails : any = [];
  formdata:any;
  displayForm : boolean = false;
  genders: string[] = ['Male', 'Female'];
  form: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    gender: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(("^((\\+971-?)|0)?[0-9]{9}$"))]],
    address: [null, [Validators.required]],
    doctorname: [null, [Validators.required]],
    editable: [false]
});
  constructor(private patientService : DoctorPatientService,
  private fb: FormBuilder) {}
  ngOnInit(): void {
    //Fetch all the Patient Data
    this.patientService.getPatientDetails().subscribe((data: Patient[])=>{
      console.log(data);
      this.dataSource = data;
    });
    //Fetch reporting Doctors details 
    this.patientService.getDoctorDetails().subscribe(res => {
      this.doctorDetails = res;
       });
  }
  addRow() {//display add row section
    this.displayForm = true;
  }
  cancel() { //Cancel add row section
    this.displayForm = false;
  }
  saveNewPatient(){
  let patientForm = this.form.value;
  console.log("form submitted is ="+patientForm);
  let arr : any = [];
  arr = this.doctorDetails;
  const selectedDoctoName = arr.filter((value : any) => value.id == patientForm.doctorname);
  const newRow = {
    id: this.dataSource[this.dataSource.length - 1].id + 1,
    name: patientForm.name,
    gender: patientForm.gender,
    mobileNumber: patientForm.phone,
    address: patientForm.address,
    doctorId: patientForm.doctorname,
    doctorFullName: selectedDoctoName[0].name
     
  };
  this.patientService.addPatient(newRow).subscribe(res => {
    console.log('Product created!');
    this.patientService.getPatientDetails().subscribe((data: Patient[])=>{
      this.dataSource = data;//update the datasource with new data
    });
  });
  this.displayForm = false;
 }
 editPatient(patient:any) {//toggle eid and save 
  patient.editable = !patient.editable;
 }
 updatePatient(patient:any){//Update the Patient
   console.log(patient);
   patient.editable = !patient.editable;
   this.patientService.updatePatient(patient.id, patient).subscribe(res => {
      console.log("patient Updated!!!");
   });
 }
 deletePatient(id:number) {// Delete the Patient
  this.patientService.deletePatient(id).subscribe(res => {
    console.log("patient deleted!!!");
    this.patientService.getPatientDetails().subscribe((data: Patient[])=>{
      this.dataSource = data;//update the datasource with new data
    });
   });
 } 
}


