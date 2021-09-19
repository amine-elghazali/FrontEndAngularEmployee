import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';


const AppRoutes : Routes = [
  {path:'',component:EmployeeComponent},
  {path:'contact',component:ContactComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
