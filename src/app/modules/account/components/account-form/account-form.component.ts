import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Shared } from 'src/app/shared/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  editMode = false;
  profile: any;

  constructor(private fb: FormBuilder, private shared: Shared, private _router: Router) {}

  ngOnInit() {
    this.editMode = this.shared.getEditMode();
    if (this.editMode) {
      this.getProfile();
    }
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.shared.setEditMode(false);
  }

  buildForm() {
    this.accountForm = this.fb.group(
      {
        name: [this.editMode ? this.profile.name : '', [Validators.required.bind(this)]],
        email: [
          this.editMode ? this.profile.email : '',
          [
            Validators.required.bind(this),
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ],
        ],
        pass: [this.editMode ? this.profile.pass : '', [Validators.required.bind(this)]],
        confirmPass: [this.editMode ? this.profile.pass : '', [Validators.required.bind(this)]],
      },
      {
        validator: this.validatePass('pass', 'confirmPass'),
      },
    );
  }

  saveUser() {
    const profile = JSON.parse(JSON.stringify(this.accountForm.value));
    delete profile.confirmPass;
    localStorage.setItem(this.accountForm.get('email').value, JSON.stringify(profile));
    if (this.editMode) {
      this._router.navigate(['home/pokemon-list']);
    } else {
      this._router.navigate(['home']);
    }
  }

  validatePass(controlPass: string, controlConfirmPass: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlPass];
      const matchingControl = formGroup.controls[controlConfirmPass];

      if (control.value && matchingControl.value) {
        if (control.value !== matchingControl.value) {
          control.setErrors({ mustMatch: true });
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
          control.setErrors(null);
        }
      }
    };
  }

  getProfile() {
    this.profile = JSON.parse(localStorage.getItem(this.shared.getEmailProfile()));
  }

  back() {
    if (this.editMode) {
      this._router.navigate(['home/pokemon-list']);
    } else {
      this._router.navigate(['home']);
    }
  }
}
