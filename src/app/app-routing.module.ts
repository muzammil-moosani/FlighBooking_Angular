import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AirlineComponent } from './airline/airline.component';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { AppComponent } from './app.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'airline', component: AirlineComponent},
  { path: 'addairline', component: AddAirlineComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'addinventory', component: AddInventoryComponent},
  { path:'searchflight', component: SearchFlightComponent},
  {path: 'book', component:BookTicketComponent},
  {path: 'ticket', component:TicketComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }