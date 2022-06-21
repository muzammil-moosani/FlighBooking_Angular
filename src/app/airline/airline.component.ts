import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {  AirlineService} from '../_services/airline.service';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from '../_services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Airline } from '../_models/airline';
@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  constructor(private airline : AirlineService,    
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.GetAllAirlines();
  }
  displayedColumns: string[] = ['name','contact','address','blocked','action'];
  dataSource: MatTableDataSource<Airline> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  GetAllAirlines(): void {  
    debugger;
    this.airline.GetAllAirlines()
    .subscribe((res:Airline[])=>{
        debugger;
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error)=>{
        this.notificationService.showError(error.message,"Fail");
      }
    );
  }
  BlockAirline(airlineId:number){
    this.airline.BlockAirline(airlineId)
   .subscribe((res:any)=>{
       this.notificationService.showSuccess("Airline Blocked","Success");
         this.GetAllAirlines();
     },(error:any)=>{
      debugger;
      this.notificationService.showError(error.message,"Fail");
     });     
 }
 UnBlockAirline(airlineId:number){
  this.airline.UnBlockAirline(airlineId)
 .subscribe((res:any)=>{
     this.notificationService.showSuccess("Airline UnBlocked","Success");
       this.GetAllAirlines();
   },(error:any)=>{
    debugger;
    this.notificationService.showError(error.message,"Fail");
   });     
}
  DeleteAirline(airlineId:number)
  {
    this.airline.DeleteAirline(airlineId)
    .subscribe((res:any)=>{
      this.notificationService.showSuccess("Airline Deleted","Success");
       this.GetAllAirlines();
    },(error:any)=>{
      this.notificationService.showError(error.message,"Fail");
    });
  }
}
