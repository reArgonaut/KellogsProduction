import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { DialogComponent } from '../../shared/dialog/dialog.component';
import {NewsFeedService} from '../noticias/news-feed.service'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  articles:any
 constructor(

   private newsService:NewsFeedService

 ) {

   this.loadNews();

 }

 loadNews(){
   //everything?q=coronavirus   top-headlines?country=mx   everything?q=coronavirus?country=mx
   this.newsService.getNews('everything?q=Kellogg').subscribe(news=>{
     this.articles=news['articles'];
     console.log(this.articles)
   })
 }
 ngOnInit() {
   
   /*Cambiar color del fondo*/

   this.bodyTag.classList.add('login-page');
   this.htmlTag.classList.add('login-page');

 }

}
