import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InstituteService } from 'src/app/modules/dashboard/pages/institute/institute.service';
import { Institute } from 'src/app/modules/dashboard/pages/institute/store/institute';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
})
export class FooterComponent implements OnInit {
  institute: Institute;

  public year: number = new Date().getFullYear();

  constructor(private _instituteService: InstituteService) {}

  ngOnInit(): void {
    this._instituteService.data.subscribe((institute) => {
      this.institute = institute;
    });
    this._instituteService.getInstitute();
  }
}
