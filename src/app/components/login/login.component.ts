import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*Cambiar color del fondo*/
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  word: string = '';
  day = new Date();
  diaActual: number;
  usuarios: any = [];
  usuariosParche: any = [];
  contrasena: string = 'password'
  flag: boolean = false;
  user = {
    email: '',
    password: '',
    permisos: null,
  };
  permisoUsuario = {
    id: '',
    fecha: null,
    changes: null,
    deletes: null,
    permisos: null,
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private users: PermisosService,
  ) { }

  ngOnInit(): void {
    this.diaActual = this.day.getDate();
    /*Cambiar color del fondo*/
    this.bodyTag.classList.add('login-pagina');
    this.htmlTag.classList.add('login-pagina');
  }

  Verificar() {
    this.usuarios = this.users.getUsuarios().subscribe((usuarios) => {
      this.usuariosParche = usuarios;
      for (let usuario of this.usuariosParche) {
        if (usuario.email == this.user.email) {
          this.capturarDatosUsuario(usuario._id, usuario.changes, usuario.fecha, usuario.deletes);
        }
      }
    });
  }
  capturarDatosUsuario(id, changes, dia, deletes) {
    this.permisoUsuario.id = id;
    this.permisoUsuario.changes = changes;
    this.permisoUsuario.deletes = deletes;
    let diaUser = (this.permisoUsuario.fecha = dia);
    if (this.word == 'Miguel21') {
      window.alert('Iniciaste sesion como Administrador')
      this.permisoUsuario.permisos = true;
    } else {
      window.alert('Iniciaste sesion como usuario comun')
      this.permisoUsuario.permisos = false;
    }
    if (diaUser != this.diaActual) {
      this.permisoUsuario.changes = 2;
      this.permisoUsuario.deletes = 2;
      this.permisoUsuario.fecha = this.diaActual;
    } else {
      this.permisoUsuario.fecha = this.diaActual;
    }
    if (this.permisoUsuario.permisos == true) {
      this.permisoUsuario.changes = 2;
      this.permisoUsuario.deletes = 2;
    }
    this.users.putDatos(this.permisoUsuario).subscribe((res) => { });
  }
  signIn() {
    this.Verificar();
    this.authService.signIn(this.user).subscribe((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUser', JSON.stringify(this.user.email));
      this.router.navigate(['/principal']);
    },
      (err) => {
        window.alert("Contraseña incorrecta o Correo no existente");
        console.log(err);
      }
    );
  }
  monstrarContrasena(monstrar) {
    this.flag = monstrar;
    this.contrasena = (this.flag == true) ? 'text' : 'password'
  }

}
