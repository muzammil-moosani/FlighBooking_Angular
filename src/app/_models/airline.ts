export class Airline {
    constructor(
        public airlineId: number,
        public airlineName: string,
        public airlineLogo: string,
        public contactAddress: string,
        public contactNumber: string,
        public isBlocked: boolean
    )
    {}
}
