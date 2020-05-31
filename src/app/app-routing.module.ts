import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhoneListComponent} from './phone-list/phone-list.component'


const routes: Routes = [
  { path: '', redirectTo: 'phonelist', pathMatch: 'full' },
  { path: 'phonelist', component: PhoneListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
