import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UpdateService } from '../update/services/update.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private update: UpdateService) { }

  ngOnInit(): void { }

}
