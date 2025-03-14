import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { email: '', password: '', rol: 'estudiante' };

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user).subscribe(
      res => alert('Registro exitoso'),
      err => alert('Error al registrarse')
    );
  }
}
