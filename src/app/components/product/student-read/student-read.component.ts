import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-read',
  templateUrl: './student-read.component.html',
  styleUrls: ['./student-read.component.scss']
})
export class StudentReadComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'sobrenome', 'idade', 'sexo', 'action'];
  dataSource: any
  length: any;
  pageSize = 10;
  pageSizeOptions = [10];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getStudent();
  }

  getStudent() {
    this.studentService.read().subscribe((student: any) => {
      this.dataSource = new MatTableDataSource<Element>(student); 
      this.length = student.length
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handlePageEvent(e: PageEvent) {    
    this.length = e.length;
    this.pageSize = e.pageSize;
  }

}
