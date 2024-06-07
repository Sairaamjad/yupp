// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MainService } from 'src/app/main.service';
// import { Case } from 'src/app/model/case';
// import { Appointment } from 'src/app/model/appointment';
// import { Patient } from 'src/app/model/patient';
// import { createAppointmentFormGroup } from 'src/app/validations/appointment-validation';
// import { createCaseFormGroup } from 'src/app/validations/case-validation';
// import { createPatientFormGroup } from 'src/app/validations/patient-validation';
// import { Doctor } from 'src/app/model/doctor';

// @Component({
//   selector: 'app-patient-form',
//   templateUrl: './patient-form.component.html',
//   styleUrls: ['./patient-form.component.css']
// })
// export class PatientFormComponent implements OnInit {
//   patient: Patient[] = [];
//   case: Case[] = [];
//   appointment: Appointment[] = [];
//   doctors: Doctor[] = [];
//   doctor_id: number[] = [];
//   patientFormGroup!: FormGroup;
//   caseFormGroup!: FormGroup;
//   appointmentFormGroup!: FormGroup;

//   firms: any[] = [];
//   insurances: any[] = [];
//   locations: any[] = [];
//   categories: string[] = ['General Checkup', 'Surgery', 'Dental', 'Emergency', 'Consultation', 'Other'];
//   caseTypes: string[] = ['Medical', 'Legal', 'Insurance', 'Other'];
//   appointment_times: string[] = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
//   appointment_type: string[] = ['Consultation', 'Follow-up', 'Procedure', 'Physical Examination', 'Therapy Session', 'Diagnostic Test', 'Vaccination'];
//   duration: string[] = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '1 hour 15 minutes', '1 hour 30 minutes', '1 hour 45 minutes', '2 hours'];
//   priorities: string[] = ['low', 'medium', 'high'];
//   case_id: number | undefined;

//   constructor(private mainService: MainService, private formBuilder: FormBuilder) { }

//   ngOnInit(): void {
//     this.patientFormGroup = createPatientFormGroup(this.formBuilder);
//     this.caseFormGroup = createCaseFormGroup(this.formBuilder);
//     this.appointmentFormGroup = createAppointmentFormGroup(this.formBuilder);
//     this.fetchInitialData();
//   }

//   fetchInitialData() {
//     this.fetchPatientData();
//     this.fetchCasesData();
//     this.fetchInsurancesData();
//     this.fetchFirmData();
//     this.fetchLocationData();
//     this.fetchDoctorsData();
//   }

//   fetchPatientData() {
//     this.mainService.get<Patient[]>('/getAllP').subscribe(
//       (patients: Patient[]) => {
//         this.patient = patients;
//       },
//       error => {
//         console.error('Error fetching patient data:', error);
//       }
//     );
//   }

//   fetchFirmData() {
//     this.mainService.get<any[]>('firms').subscribe(
//       (response: any[]) => {
//         console.log("Firms data response:", response);
//         this.firms = response.map(firm => ({ ...firm, id: firm.id }));
//         console.log(this.firms, "id present for firms");
//       },
//       error => {
//         console.error('Error fetching firms data:', error);
//       }
//     );
//   }

//   fetchInsurancesData() {
//     console.log("Fetching insurances data...");
//     this.mainService.get<any[]>('insurances').subscribe(
//       (response: any[]) => {
//         console.log("Insurances data fetched successfully:", response);
//         this.insurances = response;
//       },
//       error => {
//         console.error('Error fetching insurances data:', error);
//       }
//     );
//   }

//   fetchLocationData() {
//     this.mainService.get<any[]>('locations').subscribe(
//       (response: any[]) => {
//         this.locations = response;
//       },
//       error => {
//         console.error('Error fetching location data:', error);
//       }
//     );
//   }

//   fetchCasesData() {
//     this.mainService.get<Case[]>('/').subscribe(
//       (cases: Case[]) => {
//         this.case = cases;
//       },
//       error => {
//         console.error('Error fetching cases data:', error);
//       }
//     );
//   }

//   fetchDoctorsData() {
//     this.mainService.get<Doctor[]>('doctors').subscribe(
//       (response: Doctor[]) => {
//         this.doctors = response;
//         console.log(response, "response doctorsssssss");
//       },
//       error => {
//         console.error('Error fetching doctors data:', error);
//       }
//     );
//   }

//   onSubmitPatient(stepper: any) {
//     if (this.patientFormGroup.valid) {
//       const newPatient: Patient = this.patientFormGroup.value as Patient;
//       this.mainService.post<Patient>('patient/create', newPatient).subscribe(
//         (response: any) => {
//           console.log('Patient registration successful:', response);
//           this.patientFormGroup.patchValue({ patient_id: response.data.id });
//           stepper.next();
//         },
//         (error: any) => {
//           console.error('Patient registration error:', error);
//         }
//       );
//     } else {
//       console.log("Patient form is invalid");
//     }
//   }

//   onFirmChange(firm_id: number) {
//     const selectedFirm = this.firms.find(firm => firm.id === firm_id);
//     if (selectedFirm) {
//       this.caseFormGroup.patchValue({
//         firm_id: selectedFirm.id,
//         firm_name: selectedFirm.firm_name,
//         location: selectedFirm.location,
//         street_address: selectedFirm.street_address,
//         city: selectedFirm.city,
//         state: selectedFirm.state,
//         zip: selectedFirm.zip
//       });
//     } else {
//       console.error(`Firm with ID ${firm_id} not found.`);
//     }
//   }

//   onInsuranceChange(insurance_id: number) {
//     console.log('Selected insurance ID:', insurance_id);
//     const selectedInsurance = this.insurances.find(insurance => insurance.id === insurance_id);
//     if (selectedInsurance) {
//       this.caseFormGroup.patchValue({
//         insurance_id: insurance_id,
//         name: selectedInsurance.name,
//         insurance_code: selectedInsurance.insurance_code,
//         location_code: selectedInsurance.location_code,
//         street_address: selectedInsurance.street_address,
//         city: selectedInsurance.city,
//         state: selectedInsurance.state,
//         zip: selectedInsurance.zip,
//         email: selectedInsurance.email,
//         fax: selectedInsurance.fax,
//         phone_number: selectedInsurance.phone_number,
//         extension: selectedInsurance.extension,
//         cell_number: selectedInsurance.cell_number,
//       });
//     }
//   }

//   onLocationChange(location_id: number) {
//     console.log('Selected location ID:', location_id);
//     const selectedLocation = this.locations.find(location => location.id === location_id);
//     if (selectedLocation) {
//       this.caseFormGroup.patchValue({
//         location_id: selectedLocation.id,
//         name: selectedLocation.location,
//       });
//     }
//   }