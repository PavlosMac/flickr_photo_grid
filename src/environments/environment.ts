// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  auth0Domain: 'dev-e9idq3tb.eu.auth0.com',
  auth0Client: 'ki6RjTHNOqdo3X9ZYwMgjdJH0iUDD2O6',
  auth0ErrorPath: 'http://localhost:4200/error',
  redirectUri: 'http://localhost:4200/photo-search',
  production: false,
  apiKey: '',
  apiSecret: '',
  flickrUrl: 'https://www.flickr.com/services/rest/?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
