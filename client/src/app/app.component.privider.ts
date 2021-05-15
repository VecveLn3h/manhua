import {Injectable} from '@angular/core';

import {Http} from '@angular/http';

@Injectable()

export class AppComponentProvider{

    constructor(private http:Http){}

    get(param){
        return this.http.get('/api/page',{search:param});
    }

    search(param){
        return this.http.get('/api/search',{search:param});
    }
}