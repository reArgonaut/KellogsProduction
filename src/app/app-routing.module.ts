import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { NoticiasComponent } from './components/noticias/noticias.component';


const routes: Routes = [
  {path: 'registro',component: RegistroComponent},
  {path: 'administracion',component: AdminComponent},
  {path: 'login',component: LoginComponent},
  {path: 'principal',component: PrincipalComponent},
  {path: 'noticias',component: NoticiasComponent},
  {path: '', pathMatch:'full', redirectTo:'principal' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
