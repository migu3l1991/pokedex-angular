import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Shared } from '../shared';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private shared: Shared,
    private _router: Router
  ) {}

  canLoad() {
    if (this.shared.getEmailProfile() && this.shared.getEmailProfile().length) {
      return true;
    } else {
      this._router.navigate(['home']);
    }
  }
}
