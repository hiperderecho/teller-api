module.exports =
{ rethinkdb:
  { host    : 'localhost'
  , port    : 28015
  , authKey : ''
  , db      : 'pidelainfo'}
, emailing:
  { apiKey         : process.env.TELLER_DEV_ENV ? process.env.TELLER_DEV_EMAILING_APIKEY : process.env.TELLER_EMAILING_APIKEY
  , domain         : process.env.TELLER_DEV_ENV ? process.env.TELLER_DEV_EMAILING_DOMAIN : process.env.TELLER_EMAILING_DOMAIN
  , publicHostname : 'wxo.me'
  }
, express :
  { port: 5000 }
};