import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { InstituteService } from 'src/app/modules/dashboard/pages/institute/institute.service';
import { Institute } from 'src/app/modules/dashboard/pages/institute/store/institute';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AngularSvgIconModule, NavbarMobileMenuComponent],
})
export class NavbarMobileComponent implements OnInit {
  institute: Institute;
  url = environment.apiUrl;
  constructor(
    public menuService: MenuService,
    private _instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this._instituteService.data.subscribe((institute) => {
      this.institute = institute;
    });
    this._instituteService.getInstitute();
  }

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
