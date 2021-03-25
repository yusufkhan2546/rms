import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { Restaurent } from '../models/restaurent.model';
import { UpdateModel } from '../models/update.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit,AfterViewInit{
  @ViewChild('toggle1')toggle1$:IonToggle;
  @ViewChild('toggle2')toggle2$:IonToggle;

Restaurent=new Restaurent();


  constructor(private auth:AuthenticationService,
              ){

  }
  ngOnInit(){

  }
  ngAfterViewInit(){
    this.auth.Restaurent.subscribe((res:any) =>{
      if(res && res.restaurent && res.restaurent.token){
          this.Restaurent = res.restaurent;
         console.log(this.Restaurent);
         this.toggle1$.checked = this.Restaurent.difficultweather;


         this.toggle2$.checked = this.Restaurent.isOpen;
      } else{
        console.log('here is noresponse');
      }
    });
  }
  ionViewWillEnter(){

  }
  setWeather(){
const isChecked =this.toggle1$.checked;
this.toggle1$.checked = !isChecked;
    let updateObj = [];
    updateObj.push(new UpdateModel('difficultweather',!isChecked));
    this.auth.update(this.Restaurent._id,updateObj).subscribe(res=>{
      if(res){
        console.log(res);
      }
    });
      }
      setOnline(){
        const isChecked =this.toggle2$.checked;
        this.toggle2$.checked = !isChecked;
        let updateObj = [];
        updateObj.push(new UpdateModel('isOpen',!isChecked));
        this.auth.update(this.Restaurent._id,updateObj).subscribe(res=>{
          if(res){
            console.log(res);

          }
        });;
      }
}
