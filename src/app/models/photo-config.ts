
export interface PhotoConfig {
  srcUrl: string;
  title: string;
  id: string;
}

export interface FlickrResponse {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
