
import { Address } from "./address.model";
import { CartItem } from "./cartitem.model";

export class Order {
    _id:String = '';
    customerid:String = '';
    status:String = '';
    rider?:String = '';
    takeout?:Boolean = false;
    orderamount:Number = 0;
    deliverycharge:Number = 0;
    orderitems:CartItem[] = [];
    address:Address = null;
    rating:String = '';
}