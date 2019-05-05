import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  textBox = '';

  headUrl = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=d518b484534947e8a44fa20ffc580cd0';

  searchUrl = 'https://newsapi.org/v2/everything?' +
    'q=' + this.textBox + '&' +
    'from=2019-05-05&' +
    'sortBy=popularity&' +
    'apiKey=d518b484534947e8a44fa20ffc580cd0';
    

  headReq = new Request(this.headUrl);

  newsHead: any = [];
  totalResults: number=0;

  constructor() {
    this.callApi();
  }

  ngOnInit() {
  }
  search() {
    this.callApi();
    console.log("search lanched: ", this.textBox)
  }
  callApi() {
    if (this.newsHead.length == 0) {
      fetch(this.headReq).then(response => {
        response.json().then(res => {
          this.newsHead = res.articles;
          this.totalResults = res.totalResults;
        })
      })
    } else {
      interval(10000 * 60).subscribe(x => {
        fetch(this.headReq).then(response => {
          response.json().then(res => {
            this.newsHead = res.articles;
            console.log(this.newsHead)
          })
        })
      });
    }
  }




}
