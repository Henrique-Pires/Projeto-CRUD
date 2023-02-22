import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentCreateComponent } from './components/product/student-create/student-create.component';
import { StudentDeleteComponent } from './components/product/student-delete/student-delete.component';
import { StudentUpdateComponent } from './components/product/student-update/student-update.component';
import { HomeComponent } from './components/views/home/home.component';
import { ProductCrudComponent } from './components/views/product-crud/product-crud.component';


const routes: Routes = [
  {
  path: "",
  component: HomeComponent
  },
  {
  path: "products",
  component: ProductCrudComponent
  },
  {
  path: "products/create",
  component: StudentCreateComponent
  },
  {
  path: "products/update/:id",
  component: StudentUpdateComponent
  },
  {
  path: "products/delete/:id",
  component: StudentDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
