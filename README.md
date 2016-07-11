# Teller-api

The basic API for the Teller project.

This API will interact with the data from the Teller project. It will save and expose information of the questions, agencies and answers, it will make questions expire if they do not get an answer and it will host an administration panel.

## RethinkDB

This project will need a RethinkDB database running besides  the API.

Follow the [RethinkDB Installation](https://rethinkdb.com/docs/install/) and create a separate directory where you will run and allocate its data.

```mkdir projectdb && $_``` and then ```rethinkdb```. 

The default name for the database is ```pidelainfo```

## Emailing

This project is using [Mailgun](http://www.mailgun.com/) for the Email management.

You will probably need a free account to get their API keys.

## Installation

```git clone``` the repo and ```npm install``` the dependencies.

Run the project with ```node index```.

## Configuration

There is a ```config/index.js``` file where it is necessary to set the following values:
* ```rethinkdb```: Default values for the database connection.
* ```emailing```:
   * ```apiKey```: Your Mailgun API key.
   * ```hostname```: Your Mailgun hostname.
   * ```publicHostname```: The public hostname you will use to send emails (ie: @mydomain.com)
   * ```noReply```: The no-reply sender email.
   * ```questionCreationSubject```: The subject for the email the API will send when a question is created.
   * ```questionStatusChangedSubject```: The subject for the email the API will send when a question is answered.
   * ```authorSecretSubject```: The subject for the email the API will send when someone request the author-secret of a question
* ```admin```: 
   * ```password```: Password for the administration panel sign in.
   * ```email```: Email for the administration panel sign in.
* ```schedule```: For the management of unanswered questions.
   * ```unansweredStatus```: The unaswered status.
   * ```unansweredMaximunNumberOfDays```: The number of days to past since creation to change the question status to ```unasweredStatus```.