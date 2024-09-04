// src/app/components/comment/comment.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() restaurantId!: number; // Input to receive restaurant ID
  comments: Comment[] = [];
  commentForm: FormGroup;
  isDescending = false;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(280)]],
      content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(280)]],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    if (this.restaurantId) {
      this.loadComments();
    }
  }

  // Load comments for the current restaurant
  loadComments(): void {
    this.commentService.getComments(this.restaurantId, this.isDescending)
      .subscribe(comments => this.comments = comments);
  }

  // Submit a new comment
  submitComment(): void {
    if (this.commentForm.valid) {
      const newComment: Comment = this.commentForm.value;
      this.commentService.createComment(this.restaurantId, newComment)
        .subscribe(comment => {
          this.comments.push(comment);
          this.commentForm.reset();
        });
    }
  }

  // Delete a comment
  deleteComment(id: number): void {
    this.commentService.deleteComment(id)
      .subscribe(() => {
        this.comments = this.comments.filter(comment => comment.id !== id);
      });
  }
}
