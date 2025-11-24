class PassengerFactory {
    constructor() {
    }

    // Function to create normal distrubition - Taken from Stack overflow | Could be its own?
    boxMullerRandom() {
        let u = 0 
        let v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    }
    getNormal(mean, stdDev) {
        let standardNormal = this.boxMullerRandom();
        return Math.round(mean + (standardNormal * stdDev));
    }

    // Passenger Creation - Should also add different seat placements - Window, Middle & Aisle
    createPassengers(numberOfPassengers) {
        let passengerList = [];
        for (let i = 1; i < numberOfPassengers; i++ ) {
            let currentPassenger = new Passenger("Aisle", this.getNormal(110,10));
            passengerList.push(currentPassenger);
        }
        return passengerList;
    }
}

class Passenger {
    constructor(preference, painPoint) {
        this.preference = preference;
        this.painPoint = painPoint;
    }
}

let passenger = new Passenger("window", 350)