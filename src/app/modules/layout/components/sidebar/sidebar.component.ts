import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Institute } from 'src/app/modules/dashboard/pages/institute/store/institute';
import { InstituteService } from 'src/app/modules/dashboard/pages/institute/institute.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    AngularSvgIconModule,
    SidebarMenuComponent,
    RouterModule,
  ],
})
export class SidebarComponent implements OnInit {
  institute: Institute;
  url = environment.apiUrl

  constructor(
    public themeService: ThemeService,
    public menuService: MenuService,
    private _authService: AuthService,
    private _instituteService: InstituteService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._instituteService.data.subscribe((institute) => {
      this.institute = institute;
    });
    this._instituteService.getInstitute();
  }

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }

  signOut() {
    this._authService.signOut().subscribe(() => {
      this._router.navigate(['/auth/sign-in']);
    });
  }
}
