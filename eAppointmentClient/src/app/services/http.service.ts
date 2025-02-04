import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { baseApiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post<T>(
    apiUrl: string,
    body: any,
    callBack: (res: ResultModel<T>) => void,
    errCallback?: (err: HttpErrorResponse) => void
  ) {
    this.http.post<ResultModel<T>>(`${baseApiUrl}${apiUrl}`, body).subscribe({
      next: (res) => {
        console.log(res);
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (errCallback !== undefined) {
          errCallback(err);
        }
      },
    });
  }
}
