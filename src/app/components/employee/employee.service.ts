import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.ApiBaseUrl;

  constructor( private http:HttpClient ) { }

  public getEmployes(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/Employee/all`);
  }

  public addEmploye(employee:Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/Employee/add`,employee);  // employee => Body request
  }

  public updateEmploye(employee:Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/Employee/update`,employee);
  }

  public deleteEmploye(employeeId:number): Observable<void>{  // observable void bcz we don't send a response back on the body , we just sending OK STATUS
    return this.http.delete<void>(`${this.apiServerUrl}/Employee/delete/${employeeId}`);
  }

}
