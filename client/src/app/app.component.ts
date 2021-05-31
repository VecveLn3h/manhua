import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponentProvider } from './app.component.privider';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppComponentProvider]
})
export class AppComponent {
  title = 'app';
  list: any = [];
  param: any = {
    size: 20,
    curPage: 1,
    id: '',
    type: '1kkk'
  };
  name: string;

  page: any = {
    curPage: 1,
    pages: 1000,
    totalCount: 10000
  };
  constructor(private service: AppComponentProvider) { }

  ngOnInit() {
    this.getHttp();
  }
  // page nav
  pageChange(cur) {
    this.param.curPage = cur;
    this.getHttp();
  }

  // search
  ajax2: Subscription
  submit() {
    this.ajax2 = this.service.search({ name: this.name, type: this.param.type }).subscribe((res: any) => {
      res = res.json();

      if (res.success) {
        if (res.data.length > 0) {
          this.list = res.data;


          for (let i in this.list) {
            let item = this.list[i];
            if (item.img.indexOf('images.dmzj.com') != -1) {
              item.img = "/api/img?url=" + item.img;
            }

          }

        } else {
          this.list = [];
        }
      }
    });
  }


  // source change
  typeChange(data) {
    console.log(data);
    console.log(this.param.type);

    this.param.id = '';
    this.getHttp();
  }

  ajax: Subscription;
  getHttp() {
    this.ajax = this.service.get(this.param).subscribe((res: any) => {
      console.log(res);

      res = res.json();

      console.log(res);

      if (res.success) {

        this.list = res.data;

        this.page = res.page;

        if (this.list.length > 0) {
          this.param.id = this.list[this.list.length - 1]['_id'];
        }


        // alert();
        for (let i in this.list) {
          let item = this.list[i];
          if (item.img.indexOf('images.dmzj.com') != -1) {
            item.img = "/api/img?url=" + item.img;
          }

        }


      } else {
        this.list = [];
      }
    });
  }

  ngOnDestroy() {
    if (this.ajax) {
      this.ajax.unsubscribe();
    }
  }

}
