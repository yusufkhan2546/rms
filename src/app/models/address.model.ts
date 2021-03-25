export class Address {
    name: String = '';
    phone: String = '';
    addressline1: String = '';
    addressline2: String = '';
    city: String = '';
    state: String = '';
    pin: String = '';

    constructor(
        name: String,
        phone: String,
        addressline1: String,
        addressline2: String,
        city: String,
        state: String,
        pin: String
    ) {

        this.addressline1 = addressline1;
        this.addressline2 = addressline2;
        this.city = city;
        this.name = name;
        this.phone = phone;
        this.pin = pin;
        this.state = state;


    }
}