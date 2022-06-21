import { Component, OnInit } from '@angular/core';
import {  AirlineService} from '../_services/airline.service';
import { Airline } from '../_models/airline';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../_services/notification.service';
import { Inventory } from '../_models/inventory';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../_services/inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  inventoryForm: any;
  submitted = false;
  airlineList: {airlineId:number,airlineName:string}[] = [];

  constructor(private airline : AirlineService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private inventory: InventoryService) { 

   this.airline.GetAllAirlines()
   .subscribe((res:Airline[])=>{
       debugger;
       console.log(res);
       let air = res.filter((obj) => {
        return obj.isBlocked === false;});
       this.airlineList = air.map(p=>
         ({
           airlineId:p.airlineId,
           airlineName:p.airlineName
         })
       );
     },(error)=>{
       this.notificationService.showError(error.message,"Fail");
     }
   );
 }

  ngOnInit(): void {  

  this.inventoryForm = this.formBuilder.group({
    airlineId: ['', Validators.required],
    flightNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]],
    fromPlace: ['',Validators.required],
    toPlace: ['',Validators.required],
    startDateTime :['',Validators.required],
    endDateTime :['',Validators.required],
    scheduledDays :['',Validators.required],
    instrument :['',Validators.required],
    noOfBusinessSeats :['',Validators.required],
    noOfNonBusinessSeats :['',Validators.required],
    ticketCharges :['',Validators.required],
    noOfRows :['',Validators.required],
    meal :['',Validators.required]
  });
}

get f() { return this.inventoryForm.controls; }

onSubmit(): void {
  debugger;
  this.submitted = true;
      // stop here if form is invalid
      if (this.inventoryForm.invalid) {
          return;
      }
      let inventory = new Inventory(0,this.inventoryForm.value.airlineId,this.inventoryForm.value.flightNumber,this.inventoryForm.value.fromPlace,this.inventoryForm.value.toPlace,this.inventoryForm.value.startDateTime,this.inventoryForm.value.endDateTime,this.inventoryForm.value.scheduledDays,this.inventoryForm.value.instrument,this.inventoryForm.value.noOfBusinessSeats,this.inventoryForm.value.noOfNonBusinessSeats,this.inventoryForm.value.ticketCharges,this.inventoryForm.value.noOfRows,this.inventoryForm.value.meal);
      this.inventory.AddInventory(inventory)  
      .subscribe((res:any)=>{
          this.notificationService.showSuccess("Inventory Added","Success");
          this.router.navigate(['/inventory']);  
        },(error:any)=>{
         debugger;
         this.notificationService.showError(error.message,"Fail");
        });  
}

}
