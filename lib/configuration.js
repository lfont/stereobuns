var isProduction = process.env.NODE_ENV === 'production';

var searchServices = [
  'soundcloud',
  'exfm',
  'official.fm',
  'jamendo'
];

if (!isProduction) {
  searchServices.push('youtube');
}

exports.appName = 'stereobuns';

exports.domain = 'stereobuns.com';

exports.serverPort = process.env.PORT;

exports.searchServices = searchServices;

exports.oauthCallbackHost = 'http://soundrocket.lfont.me' +
  (exports.serverPort === 80 ?
  '' :
  ':' + exports.serverPort);

exports.googleClientId = '74763019521.apps.googleusercontent.com';
exports.googleClientSecret = 'tVkqx2niF4z86TIbfvvDsZqt';

exports.facebookClientId = '283807858430684';
exports.facebookClientSecret = '55a9883765283d989336fca975aa97f1';

exports.mongodbConnectionString = isProduction ?
  process.env.MONGOHQ_URL :
  'mongodb://localhost/soundrocket';

exports.googleAnalyticsTrackingCode = isProduction ?
  'UA-42957984-1' :
  'UA-XXXXXXXX-1';

exports.isAccessible = !isProduction;
