import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from './activity.service';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '../config';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ActivityComponent, ActivityFormComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ActivityService,
    // {provide: DateAdapter, useClass: AppDateAdapter},
    // {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class ActivityModule { }
