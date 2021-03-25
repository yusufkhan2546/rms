import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditcuisineComponent } from './editcuisine/editcuisine.component';
import { NewcuisineComponent } from './newcuisine/newcuisine.component';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path:'newcuisine',
    component:NewcuisineComponent
  },
  {
    path:'editcuisine',
    component:NewcuisineComponent
  },
  {
    path:'viewcuisine',
    component:EditcuisineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
