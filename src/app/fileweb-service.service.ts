import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver/firefox';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileWebService {
  //Unsplash Application Id
  applicationId = "3c16033ff051210748cad9bea71dac91098b9d5532cc2696f68d7362041ab796";
  // Unsplash API End Point
  urlUnsplash = "https://api.unsplash.com/search/photos?client_id=";
  //Number of result page count (1page = 10 images)
  pagecount = 1;

  // FileStack API End Point
  urlFilestack = "https://www.filestackapi.com/api/store/S3?key=AtC0kBnkQnO0GcsBGuarSz'";
  // dummy Images URL
  imgUrl = "https://d3urzlae3olibs.cloudfront.net/watermark.png";

  constructor(private httpClient: HttpClient) { }

  // Get Random Images from Unsplash
  public getImages(query: string) {
    return this.httpClient.get<any[]>(`${this.urlUnsplash}${this.applicationId}&size=640&query=${query}&page=${
      this.pagecount}`);
  }

  //Upload Image to Filestack from Browser via image URL

//Below Service can be used to upload images to Filestack from Browser using image url,
// but right now it is not working because of CORS policy as it is blocking request and not sending
// proper response when it is being called from browser. it will work if it is being called from
// postman because postman doesn't sends preflight Options with request.

// To Configure CORS in Filestack i need to take premium plan of filestack (PFA Screenshots).

//How to Check in Postman :
// Method : post
//  URL : https://www.filestackapi.com/api/store/S3?key=AtC0kBnkQnO0GcsBGuarSz 
//body : key = url and value = https://d3urzlae3olibs.cloudfront.net/watermark.png


// Response you will get
// {
//   "url": "https://cdn.filestackcontent.com/t3dZljO7QGojp7fQaSah",
//   "size": 8331,
//   "type": "image/png",
//   "filename": "watermark.png"
// }

  public uploadImages() {
    return this.httpClient.post(this.urlFilestack, { url: this.imgUrl }).pipe(
      map((response: Response) => response.json())
    );
  }
  
}