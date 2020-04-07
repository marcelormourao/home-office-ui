import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';


const routes: Routes = [
  {path:'', component: ActivityComponent},
  {path:'form', component: ActivityFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
