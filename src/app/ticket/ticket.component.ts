import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {  BookingService} from '../_services/booking.service';
import { NotificationService } from '../_services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingPassenger } from '../_models/booking-passenger';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  user = this.tokenStorageService.getUser();
  constructor(private tokenStorageService: TokenStorageService,
    private booking : BookingService,    
    private router: Router,
    private notificationService: NotificationService)
   { }

  ngOnInit(): void {    
    this.GetAllTickets(this.user);
  }

  displayedColumns: string[] = ['airlineName','flightNumber','fromPlace','toPlace',
  'startDateTime','endDateTime','bookingDate','travelClass','noOfPassenger','pnr',
  'ticketCharges','meal','passengerDetails','action'];

  dataSource: MatTableDataSource<BookingPassenger> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  GetAllTickets(user:string): void {  
    debugger;
    this.booking.GetAllTickets(user)
    .subscribe((res:any[])=>{
        debugger;
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error:any)=>{
        this.notificationService.showError(error.message,"Fail");
      }
    );
  }
  DeleteTicket(pnr:string)
  {
     this.booking.DeleteTicket(pnr)
     .subscribe((res:any)=>{
       this.notificationService.showSuccess("Ticket Cancelled","Success");
       window.setTimeout(this.reloadPage,1000);
       window.location.reload();
     },(error:any)=>{
       this.notificationService.showError(error.message,"Fail");
    });
  }
  reloadPage(): void {
    window.location.reload();  
  }
}
