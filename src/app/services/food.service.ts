import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FoodItem } from '../models/food.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
public cuisine = new FoodItem();
  constructor(private http: HttpClient) {

  }

  public addCuisine(payload:FoodItem) {
    return this.http.post<FoodItem>(`${environment.apiurl}/fooditems/newitem`,payload)
        .pipe(map(Res => {
            return Res;
        }));
}
public setCusine(cuisine:FoodItem){
this.cuisine = cuisine;
}
public getCuisines(restaurentId) {
  return this.http.get<Result>(`${environment.apiurl}/fooditems/getallfooditems/${restaurentId}`).pipe(map(res=>{
    return res;
  }));
}
public updateCuisine(id, params) {

  return this.http.patch(`${environment.apiurl}/fooditems/${id}`, params)
  .pipe(map(x => {

      return x;
  }));


}
public delete(id: string) {
  return this.http.delete(`${environment.apiurl}/fooditems/${id}`)
      .pipe(map(x => {

          return x;
      }));
}

}

