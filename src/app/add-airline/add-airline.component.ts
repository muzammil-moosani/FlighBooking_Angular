import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { AirlineService } from '../_services/airline.service';
import { NotificationService } from '../_services/notification.service';
import { Airline } from '../_models/airline';
@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  airlineForm: any;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private airlineService: AirlineService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.airlineForm = this.formBuilder.group({
      airlineName: ['', Validators.required],
      airlineLogo: ['', Validators.required],
      contactAddress: ['', Validators.required],
      contactNumber: ['', Validators.required]
  });
  }
  get f() { return this.airlineForm.controls; }
  onSubmit(): void {
    debugger;
    this.submitted = true;
      // stop here if form is invalid
      if (this.airlineForm.invalid) {
          return;
      }
      let airline = new Airline(0,this.airlineForm.value.airlineName,this.airlineForm.value.airlineLogo,this.airlineForm.value.contactAddress,this.airlineForm.value.contactNumber,false);      
      this.airlineService.AddAirline(airline)  
   .subscribe((res:any)=>{
       this.notificationService.showSuccess("Airline Added","Success");
       this.router.navigate(['/airline']);  
     },(error:any)=>{
      debugger;
      this.notificationService.showError(error.message,"Fail");
     });     
 }
}

