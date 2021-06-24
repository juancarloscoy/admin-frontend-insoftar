import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormReactiveUserComponent } from './pages/form-reactive-user/form-reactive-user.component';

const routes: Routes = [
  { path: 'form-reactive', component: FormReactiveUserComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'form-reactive' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
