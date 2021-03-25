import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { HomePage } from './home.page';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: LoginComponent,
  },
 
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
