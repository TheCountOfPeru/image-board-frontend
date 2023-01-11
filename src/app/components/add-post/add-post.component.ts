import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post = {
    title: '',
    description: '',
  };
  submitted = false;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  

  savePost(): void {
    if (this.selectedFiles){
      const formData: FormData = new FormData();
      formData.append("title", this.post.title!);
      formData.append("description", this.post.description!);
      formData.append("filename", this.selectedFiles.item(0)?.name!);
      formData.append("file", this.selectedFiles.item(0)!);
      console.log(formData);  
      this.postService.create(formData)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
    }
  }

  newPost(): void {
    this.submitted = false;
    this.post = {
      title: '',
      description: '',
      filename: "",
      file: undefined,
    };
  }

}
