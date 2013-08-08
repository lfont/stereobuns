/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.appName = 'stereobuns';

exports.domain = 'stereobuns.com';

exports.searchServices = [
  'soundcloud',
  'exfm',
  'official.fm',
  'jamendo',
  '8tracks'
];

exports.serverPort = process.env.PORT;

exports.oauthCallbackHost = process.env.OAUTH_CALLBACK_HOST || 'http://soundrocket.lfont.me:3000';

exports.googleClientId = process.env.GOOGLE_CLIENT_ID || '74763019521.apps.googleusercontent.com';
exports.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || 'tVkqx2niF4z86TIbfvvDsZqt';

exports.facebookClientId = process.env.FACEBOOK_APP_ID || '283807858430684';
exports.facebookClientSecret = process.env.FACEBOOK_APP_SECRET || '55a9883765283d989336fca975aa97f1';

exports.mongodbConnectionString = process.env.MONGOHQ_URL || 'mongodb://localhost/soundrocket';

exports.googleAnalyticsTrackingCode = process.env.GOOGLE_ANALYTICS_TRACKING_CODE || 'UA-XXXXXXXX-1';

exports.isAccessible = !process.env.COMING_SOON;
