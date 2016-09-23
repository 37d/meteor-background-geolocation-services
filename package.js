Package.describe({
  name: '37d:background-geolocation-plus',
  version: '1.2.4',
  // Brief, one-line summary of the package.
  summary: 'Cordova Background Geolocation For Android and iOS with pure javascript callbacks.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/37d/meteor-background-geolocation-services',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Cordova.depends({
  "cordova-plugin-geolocation" : "2.3.0",
  "org.flybuy.cordova.background-location-services" : "https://github.com/37d/cordova-background-geolocation-services.git#950000422f8d6199dc01bc6f602ad6ce07d371d2"
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  api.addFiles('background-geolocation-plus.js');
  api.export('BackgroundLocation');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mirrorcell:background-geolocation-plus');
  api.addFiles('background-geolocation-plus-tests.js');
});
