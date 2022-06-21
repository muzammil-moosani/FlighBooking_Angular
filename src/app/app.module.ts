import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AirlineComponent } from './airline/airline.component';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { TicketComponent } from './ticket/ticket.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AirlineComponent,
    AddAirlineComponent,
    InventoryComponent,
    AddInventoryComponent,
    SearchFlightComponent,
    BookTicketComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule, // <-- Added Table Module
    MatPaginatorModule, // <-- Added Paginator Module
    MatProgressBarModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
