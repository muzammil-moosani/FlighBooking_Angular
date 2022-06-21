import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { InventoryService } from '../_services/inventory.service';
import { Inventory } from '../_models/inventory';
import { NotificationService } from '../_services/notification.service';
import { BookingPassenger } from '../_models/booking-passenger';
import { TokenStorageService } from '../_services/token-storage.service';
import {BookingService} from '../_services/booking.service';
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private booking: BookingService,
     private inventory:InventoryService, 
     private notificationService: NotificationService,
     private router: Router
     ) { }
  inventoryId: number=0;
  ticketForm: any;
  bookingDetails: BookingPassenger = <BookingPassenger>{};
  inventoryDetails: Inventory = <Inventory>{};
  bookingDate: Date = new Date();

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      passengers: this.fb.array([this.fb.group({Name:'',Age:0,Gender:'',SeatNo:0})])
    });
    this.route.queryParams.subscribe(params=>{console.log(params);
    this.inventoryId = params['id'];
    });
    console.log(this.inventoryId);
    this.inventory.GetInventory(this.inventoryId)
    .subscribe((res:Inventory)=>{
         debugger;
         console.log(res);
         this.inventoryDetails=res;
         console.log("Booking",this.inventoryDetails);
       },(error:any)=>{
         this.notificationService.showError(error.message,"Fail");
       }
     );
  }
  get passengers() {
    debugger;
    return this.ticketForm.get('passengers') as FormArray;
  }
  addPassenger() {
    this.passengers.push(this.fb.group({Name:'',Age:0,Gender:'',SeatNo:0}));
  }

  deletePassenger(index: any) {
    this.passengers.removeAt(index);
  }

  onSubmit(): void {
    this.AssignBookingDetails();
  }

  AssignBookingDetails()
  {
    let count = this.ticketForm.get('passengers').value.length;
    if(count < 2)
    {
      this.notificationService.showError("Invalid Details","Fail");
      return
    }
    this.bookingDetails.inventoryId=this.inventoryDetails.inventoryId;
    this.bookingDetails.airlineId=this.inventoryDetails.airlineId;
    this.bookingDetails.flightNumber = this.inventoryDetails.flightNumber ;
    this.bookingDetails.userName = this.tokenStorageService.getUser();
    this.bookingDetails.email = "Muzammil@gmail.com";
    this.bookingDetails.fromPlace = this.inventoryDetails.fromPlace;
    this.bookingDetails.toPlace = this.inventoryDetails.toPlace;
    this.bookingDetails. startDateTime= this.inventoryDetails.startDateTime;
    this.bookingDetails.endDateTime = this.inventoryDetails.endDateTime;
    this.bookingDetails.meal = this.inventoryDetails.meal ;
    this.bookingDetails.ticketCharges = this.inventoryDetails.ticketCharges*(count-1);
    //this.bookingDetails.bookingDate = new Date('2022-10-10');
    this.bookingDetails.travelClass = "Economical";
    this.bookingDetails.noOfPassenger = count-1;
    this.bookingDetails.pnr = "test";
    this.passengers.removeAt(count-1);
    this.bookingDetails.passengerDetails = this.ticketForm.value.passengers;
    debugger;
    console.log("MMM",this.bookingDetails);
    this.booking.AddBooking(this.bookingDetails)
    .subscribe((res:string)=>{
      debugger;
      console.log(res);
      this.notificationService.showSuccess("Ticket Booked with PNR:"+res,"Success");
      this.router.navigate(['/ticket']);  
    },(error:any)=>{
     debugger;
     this.notificationService.showError(error.message,"Fail");
    });
  }
}
