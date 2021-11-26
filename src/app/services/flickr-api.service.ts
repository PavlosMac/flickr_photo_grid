import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FlickrResponse} from '../models/photo-config';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {

  constructor(private http: HttpClient) {}

  doPhotosReq(term: string, method: string, page: number): Observable<any> {
    const params = `method=${method}&api_key=${environment.apiKey}&text=${term}&format=json&nojsoncallback=1&per_page=7&page=${page.toString()}`;
    return this.http.get(`${environment.flickrUrl}${params}`);
  }

  getPhotoDetail(method: string, id: string): Observable<any> {
    const params = `method=flickr.photos.getInfo&api_key=${environment.apiKey}&photo_id=${id}&extras=description&&format=json&nojsoncallback=1`;
    return this.http.get(`${environment.flickrUrl}${params}`);
  }

  mapPhotos(apiP: FlickrResponse[]) {
    return apiP.map((p: FlickrResponse) => {
      console.log(p);
      const photoUrl = `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`;
      return {srcUrl: photoUrl, title: p.title, id: p.id, width: this.getRandomSize(), height: this.getRandomSize()};
    });
  }

  getRandomSize(): string {
    return Math.round(Math.random() * (400 - 200) + 200).toString();
  }

  mapPhoto(config: FlickrResponse | Partial<FlickrResponse>): string {
    return `https://live.staticflickr.com/${config.server}/${config.id}_${config.secret}.jpg`;
  }
}
