import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'src/environments/environment';
import { Institute } from 'src/app/modules/dashboard/pages/institute/store/institute';
import { InstituteService } from 'src/app/modules/dashboard/pages/institute/institute.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    NavbarMenuComponent,
    ProfileMenuComponent,
    NavbarMobileComponent,
  ],
})
export class NavbarComponent implements OnInit {
  institute: Institute;
  url = environment.apiUrl;
  constructor(
    private menuService: MenuService,
    private _instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this._instituteService.data.subscribe((institute) => {
      this.institute = institute;
    });
    this._instituteService.getInstitute();
  }

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
