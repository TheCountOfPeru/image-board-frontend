import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: Post[] = [];
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievePosts(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.postService.getAll(params)
    .subscribe(
      response => {
        const { posts, totalItems } = response;
        this.posts = posts;
        console.log(totalItems);
        console.log(this.posts);
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    console.log(event)
    this.retrievePosts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePosts();
  }


  refreshList(): void {
    this.retrievePosts();
  }

  removeAllPosts(): void {
    this.postService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.postService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
          this.refreshList();
          this.handlePageChange(1);
        },
        error: (e) => console.error(e)
      });
  }

  clearSearch(): void {
    this.title = '';
    this.page = 1;
    this.pageSize = 10;
    this.refreshList();

  }



  getThumbnail(filename: string): string {
    return "http://localhost:8080/api/files/th_"+filename;
  }

}
