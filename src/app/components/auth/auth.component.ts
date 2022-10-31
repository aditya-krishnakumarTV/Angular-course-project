import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm', { static: false }) authForm: NgForm

  isLoginMode: boolean = true
  isLoading: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    this.isLoading = true

    const email = form.value.email
    const password = form.value.password

    let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe({
      next: (user) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome!',
          showConfirmButton: false,
          timer: 1500
        })
        this.isLoading = false
      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e,
        })
        this.isLoading = false
      }
    })

    form.reset()
  }

  onSwitchLogin() {
    this.isLoginMode = !this.isLoginMode
  }

}
