import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.scss']
})
export class StudentDeleteComponent implements OnInit {
  form: FormGroup;
  id: string;
  student: Student
  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id =  this.route.snapshot.paramMap.get('id');
    this.upDateForm();
  }

  upDateForm() {
    this.form = this.fb.group({
      nome: [{value:'', disabled: true}],
      sobrenome: [{value:'', disabled: true}],
      idade: [{value:null, disabled: true}],
      sexo: [{value:'', disabled: true}],
      id: [null]
    });
    
    this.studentService.readById(this.id).subscribe(student => {
      this.student = student.id
      this.form.patchValue({
        nome: student.nome,
        sobrenome: student.sobrenome,
        idade: student.idade,
        sexo: student.sexo,
        id: student.id
      });
    })
  }

  studentDelete() {    
   this.studentService.delete(this.student).subscribe(() => {
    this.studentService.showMessage('Aluno excluido com sucesso!');
    this.router.navigate(['/products']);
   })
  }

  cancelar() {
    this.router.navigate(['/products'])
  }

}
