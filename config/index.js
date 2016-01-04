module.exports =
{ rethinkdb:
  { host    : 'localhost'
  , port    : process.env.TELLER_DB_PORT    || 28015
  , authKey : process.env.TELLER_DB_AUTHKEY || ''
  , db      : process.env.TELLER_DB_DBNAME  || 'pidelainfo'}
, emailing:
  { apiKey                       : process.env.TELLER_DEV_ENV ? process.env.TELLER_DEV_EMAILING_APIKEY : process.env.TELLER_EMAILING_APIKEY
  , domain                       : process.env.TELLER_DEV_ENV ? process.env.TELLER_DEV_EMAILING_DOMAIN : process.env.TELLER_EMAILING_DOMAIN
  , publicHostname               : process.env.TELLER_EMAILING_HOSTNAME || 'juanlajara.com'
  , noReply                      : 'no-reply@pidela.info'
  , questionCreationSubject      : 'Haz creado una pregunta en Pidela.info'
  , questionStatusChangedSubject : 'Tu pregunta tiene una nueva respuesta'
  , authorSecretSubject          : 'Pidela.info: Código de Autor'
  }
, admin:
  { password : process.env.TELLER_API_ADMIN_PASSWORD || 'i2wES1Ky4vMeO3h'
  , email    : process.env.TELLER_API_ADMIN_EMAIL    || 'juanlajara@gmail.com'}
, schedule:
  { unansweredStatus : 'unanswered' }
, express :
  { port: 5000 }
};