import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      idade: [null, Validators.required],
      sexo: ['', Validators.required],
    });
  }

  studentCreate() {
    const value =  {...this.form.value, idade: +this.form.value.idade};

    if(this.form.valid) {
      this.studentService.create(value).subscribe(() => {
        this.studentService.showMessage('Cadastro realizado com sucesso!');
        this.router.navigate(['/products'])
      })
    }else {
      this.studentService.showMessage("Favor preencher os campos obrigatórios!", true);
    }

  }

  cancelar() {
    this.router.navigate(['/products'])
  }
}
