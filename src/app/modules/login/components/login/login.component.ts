import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Shared } from 'src/app/shared/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _shared: Shared
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      password: ['']
    });
  }

  login(email: string, pass: string) {
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.pass === pass) {
      this._shared.setEmailProfile(email);
      this.error = false;
      this._router.navigate(['/home/pokemon-list']);
    } else {
      this.error = true;
    }
  }
}
