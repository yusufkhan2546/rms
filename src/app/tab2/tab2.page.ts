import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodItem } from '../models/food.model';
import { AuthenticationService } from '../services/authentication.service';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  FoodItems: FoodItem[] = [];
  constructor(private foodService: FoodService,
              private auth:AuthenticationService,
              private router:Router) { }

  ionViewWillEnter() {

const id = this.auth.RestaurentValue._id;

if(id){

  this.foodService.getCuisines(id).subscribe(res => {
    if (res && res.docs) {
      this.FoodItems = res.docs;
    }
  });
} else {

}




  }
  getOffer(number){
    return parseInt(number);
  }
  view(item){
this.foodService.setCusine(item);
this.router.navigate([`/tabs/tab2/editcuisine`]);
  }
  edit(item){
    this.foodService.setCusine(item);
    this.router.navigate([`/tabs/tab2/viewcuisine`]);
  }
  delete(id,index){
    this.foodService.delete(id).subscribe(res=>{
      if(res){
         if(index>-1){
           this.FoodItems.splice(index,1);
         }
      }
    });
  }

}
