import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {
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
      nome: [''],
      sobrenome: [''],
      idade: [null],
      sexo: [''],
      id: [null]
    });
    
    this.studentService.readById(this.id).subscribe(student => {
      this.form.patchValue({
        nome: student.nome,
        sobrenome: student.sobrenome,
        idade: student.idade,
        sexo: student.sexo,
        id: student.id
      });
    })
  }

  studentUpdate() {
   this.student = this.form.value;
    
   this.studentService.update(this.student).subscribe(() => {
    this.studentService.showMessage('Aluno atualizado com sucesso!');
    this.router.navigate(['/products']);
   })
  }

  cancelar() {
    this.router.navigate(['/products'])
  }
}
