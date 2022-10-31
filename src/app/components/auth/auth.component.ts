import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

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
    if (this.isLoginMode) {
      // this.authService.signIn(email, password).subscribe({
      //   next: (user) => {
      //     console.log(user)
      //   },
      //   error: (e) => {
      //     console.log(e)
      //   }
      // })
      // this.isLoading = false
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (user) => {
          console.log(user)
          this.isLoading = false
        },
        error: (e) => {
          console.log(e)
          this.isLoading = false
        }
      })
    }
    form.reset()
  }

  onSwitchLogin() {
    this.isLoginMode = !this.isLoginMode
  }

}
