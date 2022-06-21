import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {  InventoryService} from '../_services/inventory.service';
import { NotificationService } from '../_services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventory } from '../_models/inventory';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {  
  constructor(private inventory : InventoryService,    
    private router: Router,
    private notificationService: NotificationService) {     
  }
  ngOnInit(): void { 
    this.GetAllInventories();   
  }
  displayedColumns: string[] = ['airlineName','flightNumber','fromPlace','toPlace',
  'startDateTime','endDateTime','scheduledDays','instrument','noOfBusinessSeats','noOfNonBusinessSeats',
  'ticketCharges','noOfRows','meal','action'];
  dataSource: MatTableDataSource<Inventory> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  GetAllInventories(): void {  
    debugger;
    this.inventory.GetAllInventories()
    .subscribe((res:Inventory[])=>{
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
  DeleteInventory(inventoryId:number)
  {
    this.inventory.DeleteInventory(inventoryId)
    .subscribe((res:any)=>{
      this.notificationService.showSuccess("Inventory Deleted","Success");
       this.GetAllInventories();
    },(error:any)=>{
      this.notificationService.showError(error.message,"Fail");
    });
  }
}
