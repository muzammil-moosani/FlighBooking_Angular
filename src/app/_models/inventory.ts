export class Inventory {
    constructor(
        public inventoryId: number,
        public airlineId: number,
        public flightNumber: number,
        public fromPlace: string,
        public toPlace: string,
        public startDateTime: Date,
        public endDateTime: Date,
        public scheduledDays: string,
        public instrument: string,
        public noOfBusinessSeats: number,
        public noOfNonBusinessSeats: number,
        public ticketCharges: number,
        public noOfRows: number,
        public meal: string,        
        public airlineName?: string
    )
    {}
}
