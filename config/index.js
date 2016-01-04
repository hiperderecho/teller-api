module.exports =
{ rethinkdb:
  { host    : 'localhost'
  , port    : 28015
  , authKey : ''
  , db      : 'pidelainfo'}
, emailing:
  { apiKey                       : process.env.TELLER_DEV_ENV ? process.env.TELLER_DEV_EMAILING_APIKEY : process.env.TELLER_EMAILING_APIKEY
  , domain                       : process.env.TELLER_DEV_ENV ? process.env.TELLER_DEV_EMAILING_DOMAIN : process.env.TELLER_EMAILING_DOMAIN
  , publicHostname               : 'juanlajara.com'
  , noReply                      : 'no-reply@pidela.info'
  , questionCreationSubject      : 'Haz creado una pregunta en Pidela.info'
  , questionStatusChangedSubject : 'Tu pregunta tiene una nueva respuesta'
  , authorSecretSubject          : 'Pidela.info: Código de Autor'
  }
, admin:
  { password : 'i2wES1Ky4vMeO3h'
  , email    : 'juanlajara@gmail.com'}
, schedule:
  { unansweredStatus : 'unanswered' }
, express :
  { port: 5000 }
};