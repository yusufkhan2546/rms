import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-editcuisine',
  templateUrl: './editcuisine.component.html',
  styleUrls: ['./editcuisine.component.scss'],
})
export class EditcuisineComponent implements OnInit {
  FoodItem = new FoodItem();
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private foodService:FoodService) { }

  ngOnInit() {}
  ionViewWillEnter(){
    this.FoodItem = this.foodService.cuisine;
  }
}

