import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../_services/notification.service';
import { Inventory } from '../_models/inventory';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../_services/inventory.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  searchForm: any;
  submitted = false;
  isFound = false;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private inventory: InventoryService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      startDateTime: ['', Validators.required],
      round: Boolean,
      endDateTime: [null]
    });
  }
  displayedColumns: string[] = ['airlineName','flightNumber','fromPlace','toPlace',
  'startDateTime','endDateTime','scheduledDays','instrument','noOfBusinessSeats','noOfNonBusinessSeats',
  'ticketCharges','noOfRows','meal','action'];

  dataSource: MatTableDataSource<Inventory> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  get f() { return this.searchForm.controls; }
  onSubmit(): void {
    debugger;
    this.submitted = true;
        // stop here if form is invalid
      if (this.searchForm.invalid) {        
        return;
      }
      this.isFound= true;
      this.inventory.SearchInventory(this.searchForm.value.source,this.searchForm.value.destination,this.searchForm.value.startDateTime,this.searchForm.value.round,this.searchForm.value.endDateTime)
        .subscribe((res:Inventory[])=> {
          debugger;
        console.log(res);
        if(res.length < 1)
        {
          this.isFound= false;
          return;
        }
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error:any)=> {
        this.notificationService.showError(error.message,"Fail");
      }
    );        
  }
  BookTicket(inventoryId:number)
  {
    this.router.navigate(['/book'],
    { queryParams : { id:inventoryId}}
    );
  }
}
