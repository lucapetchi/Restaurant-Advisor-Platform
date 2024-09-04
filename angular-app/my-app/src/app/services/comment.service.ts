
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment'; 
//import { environment } from '../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:5079/api/comment'

  constructor(private http: HttpClient) { }

  // Get all comments for a restaurant
  getComments(restaurantId: number, descending: boolean = false): Observable<Comment[]> {
    let params = new HttpParams()
      .set('id', restaurantId.toString())
      .set('isDescending', descending.toString());
    
    return this.http.get<Comment[]>(`${this.baseUrl}`, { params });
  }

  // Get a comment by its ID
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }

  // Create a new comment
  createComment(restaurantId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/${restaurantId}`, comment);
  }

  // Update an existing comment
  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/${id}`, comment);
  }

  // Delete a comment
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
