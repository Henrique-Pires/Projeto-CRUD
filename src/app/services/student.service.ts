import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Student } from '../components/product/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = "https://api-laser-teste.herokuapp.com/alunos"
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student).pipe(
      map((obj) => obj),
      catchError((e => this.errorHandler(e)))
    );
  }

  read(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e => this.errorHandler(e)))
    );
  }

  readById(id: string): Observable<Student> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Student>(url).pipe(
      map((obj) => obj),
      catchError((e => this.errorHandler(e)))
    );
  }

  update(student: Student): Observable<Student> {
    const url = `${this.baseUrl}/${student.id}`    
    return this.http.put<Student>(url, student).pipe(
      map((obj) => obj),
      catchError((e => this.errorHandler(e)))
    );
  }

  delete(id: any): Observable<Student> {
    const url = `${this.baseUrl}/${id}`    
    return this.http.delete<Student>(url).pipe(
      map((obj) => obj),
      catchError((e => this.errorHandler(e)))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY
  }

}
