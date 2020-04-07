import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ActivityModule } from './activity/activity.module';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS, getPaginatorIntl } from './config';
import { UserService } from './user.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UserModule } from './user/user.module';
import { NgxMaskModule } from 'ngx-mask'

// export const options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ActivityModule,
    UserModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: MatPaginatorIntl , useValue: getPaginatorIntl()},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
