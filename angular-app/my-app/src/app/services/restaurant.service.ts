import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


import { Restaurant } from '../models/restaurant';
import { AuthService } from './auth.service';

const RESTAURANT_API = 'http://localhost:5079/api/restaurant'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

constructor(private http: HttpClient ,private authService: AuthService) {
    console.log(this.http);
 }

getRestaurant(id: string) : Observable<Restaurant> {
  return this.http.get<Restaurant>(`${RESTAURANT_API}/${id}`);
}

addRestaurant(body: any): Observable<Restaurant> {
  return this.http.post<Restaurant>(RESTAURANT_API, body);
}

// getRestaurants(): Observable<Restaurant[]> {
//   return this.http.get<Restaurant[]>(RESTAURANT_API, { headers: this.getAuthHeaders() });
// }

// getRestaurants(pageNumber: number, pageSize: number): Observable<Restaurant[]> {
//   let params = new HttpParams();
//   params = params.append('PageNumber', pageNumber.toString());
//   params = params.append('PageSize', pageSize.toString());

//   return this.http.get<Restaurant[]>(RESTAURANT_API, {
//     headers: this.getAuthHeaders(),
//     params: params
//   });
// }

getRestaurants(
  pageNumber: number, 
  pageSize: number, 
  type?: string, 
  priceRating?: number | null
): Observable<Restaurant[]> {
  let params = new HttpParams()
    .set('PageNumber', pageNumber.toString())
    .set('PageSize', pageSize.toString());

  if (type) {
    params = params.set('Type', type);
  }

  if (priceRating !== undefined && priceRating !== null) {
    params = params.set('PriceRating', priceRating.toString());
  }

  return this.http.get<Restaurant[]>(RESTAURANT_API, {
    headers: this.getAuthHeaders(),
    params: params
  });
}

deleteRestaurant(id: string): Observable<Restaurant> {
  return this.http.delete<Restaurant>(`${RESTAURANT_API}/${id}`); 
}



editRestaurant(id: string, body: Restaurant): Observable<Restaurant> {
  console.log(id.toString());
  console.log(typeof(id.toString()));
  return this.http.put<Restaurant>(`${RESTAURANT_API}/${id}`, body);
}
private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}


}
