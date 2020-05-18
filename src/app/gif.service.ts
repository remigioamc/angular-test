import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams
} from "@angular/common/http"; 
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GifService {

  constructor(private http: HttpClient) { }

  api_key: string = 'wJk2dVjecbIK3Rs8Qz4QTBgZi6jQNvZ9'
  url: string = "http://api.giphy.com/v1/gifs"

  public search(keyword: string, limit: string = '16'): Observable<[]>{
    if(!keyword) return this.trending(limit)
    let options = {params: {
      q: keyword,
      rating: 'G',
      limit: limit,
      api_key: this.api_key
    }}
    return this.http.get(this.url + "/search", options).pipe(
      map(value => value["data"]))
  }

  public trending(limit: string = '16'): Observable<[]>{
    let options = {params: {
      rating: 'G',
      limit: limit,
      api_key: this.api_key
    }}
    return this.http.get(this.url + "/trending", options).pipe(
      map(value => value["data"]))
  }
}
