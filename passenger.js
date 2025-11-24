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

    seatTypeGenerator() {
        // if between 1-4 Window, 5-6 middle, 7-10 aisle
        let seatTypeNumber = this.getNormal(5,5);
        if (seatTypeNumber < 4) {
            return "Window"
        }
        if (seatTypeNumber >= 5 && seatTypeNumber < 7) {
            return "Middle"
        }

        return "Aisle"
    }

    seatClassGenerator() {
        // if in range 1-8 then economy - if 9 or 10 then first class
        let seatClassNumber = this.getNormal(5,5);
        if (seatClassNumber <= 8) {
            return "Economy"
        } else {
            return "First-class"
        }
    }




    // Passenger Creation - Should also add different seat placements - Window, Middle & Aisle
    createPassengers(numberOfPassengers,mean, deviation) {
        let passengerList = [];
        for (let i = 1; i < numberOfPassengers; i++ ) {
            let currentPassenger = new Passenger(this.seatTypeGenerator(), this.getNormal(mean,deviation), this.seatClassGenerator());
            passengerList.push(currentPassenger);
        }
        return passengerList;
    }
}

class Passenger {
    constructor(preference, painPoint, classPreference) {
        this.preference = preference;
        this.painPoint = painPoint;
        this.classPreference = classPreference;
    }
}

let passenger = new Passenger("window", 350)