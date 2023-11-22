import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/dashboard/pages/user/store/user';
import { UserService } from 'src/app/modules/dashboard/pages/user/user.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, RouterModule],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  user: User;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService.userData.subscribe((user) => {
      this.user = user;
    });
    this._userService.getUser();
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    this._authService.signOut().subscribe(() => {
      this._router.navigate(['/auth']);
    });
  }
}
