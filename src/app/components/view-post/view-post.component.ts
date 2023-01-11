import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  
  currentPost: Post = {};
  

  constructor(
    private postService: PostService,
    private _Activatedroute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.retrievePost();
  }

  getRequestParams(id: string): any {
    let params: any = {};

    if (id) {
      params[`id`] = id;
    }

    return params;
  }

  retrievePost(): void {

    this.postService.get(this._Activatedroute.snapshot.paramMap.get('id')!)
    .subscribe(
      response => {
        const post = response;
        console.log(post);
        this.currentPost = post;
      },
      error => {
        console.log(error);
      });
  }

  getImage(filename: string): string {
    return "http://localhost:8080/api/files/"+filename;
  }
}
