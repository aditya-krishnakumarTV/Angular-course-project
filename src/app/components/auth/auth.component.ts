import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('loginForm', { static: false }) loginForm: NgForm

  isLoginMode: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    console.log(form)
  }

  onSwitchLogin() {
    this.isLoginMode = !this.isLoginMode
  }

}
