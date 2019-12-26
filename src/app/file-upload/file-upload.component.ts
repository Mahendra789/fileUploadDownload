import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileWebService } from '../fileweb-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilestackService } from '@filestack/angular';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class FileUploadComponent implements OnInit {
  imageVoUnsplash: any;
  closeResult: string;
  searchQuery: string = '';
  files: any;
  apikey: string;
  uploadedImages: Array<string> = new Array<string>();
  constructor(private fileWebService: FileWebService, private modalService: NgbModal, private filestackService: FilestackService) { }

  ngOnInit() {
   this.filestackService.init('AtC0kBnkQnO0GcsBGuarSz');
  }

  //Get Images from Unsplash
  getImages = (search: string) => {
    this.imageVoUnsplash = [];
    this.fileWebService.getImages(search).subscribe((data) => {
      this.imageVoUnsplash = data;
    });
  }
  //Open Scrollable Image Model
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'xl', scrollable: true, backdropClass: 'light-blue-backdrop' });
  }


  //Select Files from Event
  fileChanged(e) {
    this.files = e.target.files;
  }
  //Upload selected files to Filestack
  uploadFile() {
    this.uploadedImages = [];
    for(let file of this.files){
      this.filestackService.upload(file)
      .subscribe(res => {
        let data:any = res;
        this.uploadedImages.push(data.url);
      });
    }
  }
}
