import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoPageComponent {
  constructor(private router: Router) {}
}
