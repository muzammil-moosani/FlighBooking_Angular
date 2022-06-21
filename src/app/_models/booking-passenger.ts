import { Passengers } from "./passengers";

export class BookingPassenger {
    inventoryId: number = 0;
    airlineId: number = 0;    
    flightNumber: number = 0;
    userName: string="";
    email: string="Muzammil@gmail.com";
    fromPlace: string ="";
    toPlace: string="";
    startDateTime: Date = new Date();
    endDateTime: Date = new Date();
    meal: string = "";
    ticketCharges: number = 0;
    //bookingDate: Date= new Date();
    travelClass: string = "Economical";
    noOfPassenger: number = 0;
    pnr: string = "";
    passengerDetails: string = "";
}
