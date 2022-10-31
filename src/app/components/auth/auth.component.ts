import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm', { static: false }) authForm: NgForm

  isLoginMode: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    console.log(form)
    form.reset()
  }

  onSwitchLogin() {
    this.isLoginMode = !this.isLoginMode
  }

}
