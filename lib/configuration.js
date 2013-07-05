var isProduction   = process.env.NODE_ENV === 'production',
    searchServices = [
        'soundcloud',
        'exfm',
        'official.fm',
        'jamendo'
    ];

if (!isProduction) {
    searchServices.push('youtube');
}

exports.serverPort = process.env.PORT || 3000;

exports.searchServices = searchServices;

exports.oauthCallbackHost = 'http://soundrocket.lfont.me' +
    (exports.serverPort === 80 ?
    '' :
    ':' + exports.serverPort);

exports.googleClientId = '74763019521.apps.googleusercontent.com';
exports.googleClientSecret = 'tVkqx2niF4z86TIbfvvDsZqt';

exports.facebookClientId = '283807858430684';
exports.facebookClientSecret = '55a9883765283d989336fca975aa97f1';

exports.mongodbConnectionString = 'mongodb://localhost/soundrocket';

exports.googleAnalyticsTrackingCode = isProduction ? 'UA-34256671-4' : 'UA-XXXXXXXX-1';
