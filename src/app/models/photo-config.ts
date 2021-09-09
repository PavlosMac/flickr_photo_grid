
export interface PhotoConfig {
  srcUrl: string;
  title: string;
  height: string;
  width: string;
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
