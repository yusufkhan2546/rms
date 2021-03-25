import { Address } from "./address.model";


export class Restaurent {
    _id?:String = '';
    name:String = '';
    phone:String = '';
    email:String = '';
    password:String = '';
    address:Address = null;
    rating?:String = '';
    isOpen?:boolean  = false;
    difficultweather?:boolean = false;
    closingTime:Date = null;
    openingTime:Date = null;
    token?:String = '';
    startsFrom:Number = 0;
    currentOffer:Number = 0;

}
export class RestaurentShowModel {
    _id?:String = '';
    name:String = '';
    rating:String = '';
    offer:String = '';
    startFrom:String = '';
    closingTime:String = '';
    isOpen:Boolean  = false;
}
