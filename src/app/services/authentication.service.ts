import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Restaurent } from '../models/restaurent.model';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private RestaurentSubject: BehaviorSubject<any>;
    public Restaurent: Observable<Restaurent>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.RestaurentSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('Restaurent')));
        this.Restaurent = this.RestaurentSubject.asObservable();
    }

    public get RestaurentValue(): Restaurent {

        if(this.RestaurentSubject.value){
          return this.RestaurentSubject.value.restaurent;
        }
    }

    login(payload) {
        return this.http.post<any>(`${environment.apiurl}/restaurents/login`, { email:payload.email, password:payload.password ,phone:payload.phone })
            .pipe(map(Restaurent => {
                // store Restaurent details and jwt token in local storage to keep Restaurent logged in between page refreshes
                localStorage.setItem('Restaurent', JSON.stringify(Restaurent));
                this.RestaurentSubject.next(Restaurent);
                return Restaurent;
            }));
    }
    logout() {
        // remove Restaurent from local storage and set current Restaurent to null
        localStorage.removeItem('Restaurent');
        this.RestaurentSubject.next(null);
        this.router.navigate(['/home']);
    }

    register(Restaurent: Restaurent) {
        return this.http.post(`${environment.apiurl}/restaurents/signup`, Restaurent);
    }

    getAll() {
        return this.http.get<Restaurent[]>(`${environment.apiurl}/Restaurents`);
    }

    getById(id: string) {
        return this.http.get<Restaurent>(`${environment.apiurl}/Restaurents/${id}`);
    }

    update(id, params) {

        return this.http.patch(`${environment.apiurl}/restaurents/${id}`, params)
        .pipe(map(x => {
            // update stored Restaurent if the logged in Restaurent updated their own record
            if (id == this.RestaurentValue._id) {
                // update local storage
                let Restaurent = this.RestaurentValue;
                params.forEach(element => {
                  if(element.PropName === 'isOpen'){
                     Restaurent.isOpen = element.value;
                  }
                  if(element.PropName === 'difficultweather'){
                   Restaurent.difficultweather = element.value;
                  }
                });

                localStorage.setItem('Restaurent', JSON.stringify(Restaurent));

                // publish updated Restaurent to subscribers
                this.RestaurentSubject.next(Restaurent);
            }
            return x;
        }));


    }

    delete(id: string) {
        return this.http.delete(`${environment.apiurl}/Restaurents/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in Restaurent deleted their own record
                if (id == this.RestaurentValue._id) {
                    this.logout();
                }
                return x;
            }));
    }
    verify(payload){
        return this.http.post<any>(`${environment.apiurl}/Restaurents/verify`, payload)
        .pipe(map(res=>{
            if(res){
                return res;
               }
        }
        ));
}
}
