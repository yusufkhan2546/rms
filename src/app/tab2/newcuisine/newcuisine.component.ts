import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodItem } from 'src/app/models/food.model';
import { UpdateModel } from 'src/app/models/update.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-newcuisine',
  templateUrl: './newcuisine.component.html',
  styleUrls: ['./newcuisine.component.scss'],
})
export class NewcuisineComponent implements OnInit {
  isEdit= false;
cuisineForm:FormGroup;
cuisineImages:[] = [];
imageUrl:FormControl = new FormControl('assets/img/pizza.jpg');
imagesList:any[] = [];
chipsList:any[] = [];
chips:FormControl = new FormControl('Afghani');
  constructor(private fb:FormBuilder,
              private auth:AuthenticationService,
              private foodService:FoodService,
              private router:Router) { }

  ngOnInit() {

this.cuisineForm = this.fb.group({
      _id:[''],
      restaurentId:['',Validators.required],
      name:['',Validators.required],
      price:['',Validators.required],
      cuisine:['',Validators.required],
      rating:[0],
      detail:['',Validators.required],
      images:['',Validators.required],
      saleprice:['',Validators.required],
      offer:[''],
});

  }

  ionViewWillEnter(){
    console.log(this.router.url);
    if(this.router.url === '/tabs/tab2/editcuisine'){
      this.isEdit = true;
      const cuisine:FoodItem = this.foodService.cuisine;
      if(cuisine._id){
        this.imagesList = cuisine.images;
        this.chipsList = cuisine.cuisine;
        this.cuisineForm.get('_id').setValue(cuisine._id);
        this.cuisineForm.get('restaurentId').setValue(cuisine.restaurentId);
        this.cuisineForm.get('name').setValue(cuisine.name);
        this.cuisineForm.get('price').setValue(cuisine.price);
        this.cuisineForm.get('detail').setValue(cuisine.detail);
        this.cuisineForm.get('rating').setValue(cuisine.rating);
        this.cuisineForm.get('saleprice').setValue(cuisine.saleprice);
        this.cuisineForm.get('offer').setValue(cuisine.offer);

      }

     }
  }
  submitCuisine(){
    if(this.imagesList.length === 0 && this.chipsList.length === 0){

    } else {
      this.cuisineForm.get('images').setValue(this.imagesList);
      this.cuisineForm.get('cuisine').setValue(this.chipsList);
      this.cuisineForm.get('restaurentId').setValue(this.auth.RestaurentValue._id);
      this.cuisineForm.get('offer').setValue(100-parseInt(this.cuisineForm.get('saleprice').value)*100/parseInt(this.cuisineForm.get('price').value));

    }
if(this.cuisineForm.valid){
  if(this.isEdit){
let updateObj =[];
updateObj.push(new UpdateModel('name',this.cuisineForm.get('name').value));
updateObj.push(new UpdateModel('price',this.cuisineForm.get('price').value));
updateObj.push(new UpdateModel('detail',this.cuisineForm.get('detail').value));
updateObj.push(new UpdateModel('images',this.cuisineForm.get('images').value));
updateObj.push(new UpdateModel('cuisine',this.cuisineForm.get('cuisine').value));
updateObj.push(new UpdateModel('saleprice',this.cuisineForm.get('saleprice').value));
updateObj.push(new UpdateModel('offer',this.cuisineForm.get('offer').value));
this.foodService.updateCuisine(this.cuisineForm.get('_id').value,updateObj).subscribe(res=>{
if(res){
  this.reset();
}

});


  }else {
    this.foodService.addCuisine(this.cuisineForm.value).subscribe(res=>{
      if(res){
        this.reset();
      }
    });
  }

}
  }
  AddCatageory(){
if(this.chips.valid){
this.chipsList.push(this.chips.value);
this.chips.reset();
}
  }
  AddImage(){
if(this.imageUrl.valid){
this.imagesList.push(this.imageUrl.value);
this.imageUrl.reset();
}
  }
  delete(number,index){
if(number ===1){
if(index>-1){
  this.imagesList.splice(index,1);
}
} else {
  if(index>-1){
    this.chipsList.splice(index,1);
  }
}
  }

  checkImages(){
    return this.imagesList.length !== 0;
  }
  checkChips(){
    return this.chipsList.length !== 0;
  }

reset(){
  this.cuisineForm.reset();
        this.imageUrl.reset();
        this.chips.reset();
        this.imagesList = [];
        this.chipsList = [];
}
}
