import { NgForm } from '@angular/forms';
//import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import {NewsFeedService} from '../noticias/news-feed.service'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  constructor( ) {
  }
  ngOnInit() {
  }
}
