import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../model/doctor';
import { Patient } from '../model/patient';
import { DoctorPatientService } from '../service/common-util.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  displayDoctorColumns: string[] = ['id', 'name', 'gender', 'phone', 'address', 'specialization','patientname', 'actions'];
  doctorDetails: any = [];
  patientData: any;
  displayForm: boolean = false;
  form: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    gender: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(("^((\\+971-?)|0)?[0-9]{9}$"))]],
    address: [null, [Validators.required]],
    specialization: [null, [Validators.required]],
    editable: [false]
  });
  constructor(private doctorService: DoctorPatientService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    //Get doctors records
    this.doctorService.getDoctorDetails().subscribe((data: Doctor[]) => {
      console.log(data);
      this.doctorDetails = data;
    });
    //Get associated patient details
    this.doctorService.getPatientDetails().subscribe((res: Patient[]) => {
      this.patientData = res;
      console.log("frmo doctors compo=" + this.patientData);
    });
  }
  addRow() {
    this.displayForm = true;
  }
  cancel() {
    this.displayForm = false;
  }
  saveNewDoctor() {
    let doctorForm = this.form.value;
    console.log("form submitted is =" + doctorForm);
    const newRow = {
      id: this.doctorDetails[this.doctorDetails.length - 1].id + 1,
      name: doctorForm.name,
      gender: doctorForm.gender,
      mobileNumber: doctorForm.phone,
      address: doctorForm.address,
      specialization: doctorForm.specialization

    };
    
    this.doctorService.addDoctor(newRow).subscribe(res => {
      console.log('Doctor Added!');
      this.doctorService.getDoctorDetails().subscribe((data: Doctor[]) => {
        this.doctorDetails = data;//update the datasource with new data
      });
    });
    this.displayForm = false;
  }
  editDoctor(doctor:any) {//toggle eid and save 
    doctor.editable = !doctor.editable;
   }
   updateDoctor(doctor:any){//Update the Patient
     console.log(doctor);
     doctor.editable = !doctor.editable;
     this.doctorService.updateDoctor(doctor.id, doctor).subscribe(res => {
        console.log("doctor Updated!!!");
     });
   }
   deleteDoctor(id:number) {// Delete the Patient
    this.doctorService.deleteDoctor(id).subscribe(res => {
      console.log("Doctor deleted!!!");
      this.doctorService.getDoctorDetails().subscribe((data: Doctor[])=>{
        this.doctorDetails = data;//update the datasource with new data
      });
     });
   } 
}
