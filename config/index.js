module.exports =
{ rethinkdb:
  { host    : 'localhost'
  , port    : 28015
  , authKey : ''
  , db      : 'pidelainfo'}
, emailing:
  { apiKey : process.env.TELLER_EMAILING_APIKEY || ''
  , domain : process.env.TELLER_EMAILING_DOMAIN || ''
  }
, express :
  { port: 5000 }
};