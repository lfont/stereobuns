/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var isCloud9 = process.env.C9_PROJECT && process.env.C9_PROJECT === 'soundrocket';

exports.appName = 'stereobuns';

exports.domain = 'stereobuns.com';

exports.tomahawk = {
  resolvers: [
    'soundcloud',
    'exfm',
    'official.fm'
  ],
  limit: 30
};

exports.serverPort = process.env.PORT;

exports.oauthCallbackHost = process.env.OAUTH_CALLBACK_HOST ||
                            (isCloud9 ?
                                'http://soundrocket.lfont.c9.io' :
                                'http://soundrocket.lfont.me:3000');

exports.mongodbConnectionString = process.env.MONGOHQ_URL ||
                                  'mongodb://cloud9:nP03T%Wn@paulo.mongohq.com:10075/soundrocket';

exports.google = {
  apiKey      : process.env.GOOGLE_API_KEY                 || 'AIzaSyC2Zjh3W71wZIGbRLq-kK2KVGJbvtU6PjY',
  clientId    : process.env.GOOGLE_CLIENT_ID               || '74763019521.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET           || 'tVkqx2niF4z86TIbfvvDsZqt',
  trackingCode: process.env.GOOGLE_ANALYTICS_TRACKING_CODE || 'UA-XXXXXXXX-1'
};

exports.facebook = {
  appId    : process.env.FACEBOOK_APP_ID     || '283807858430684',
  appSecret: process.env.FACEBOOK_APP_SECRET || '55a9883765283d989336fca975aa97f1'
};

exports.isAccessible = !process.env.COMING_SOON;
