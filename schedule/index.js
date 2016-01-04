var CronJob = require( "cron" ).CronJob;

var methods = require('../methods');

var onCronJobTick = function () {
	console.log( 'tick' );
	methods.updateQuestionsStatusBySchedule();
};

var job = new CronJob('00 30 2 * * *', onCronJobTick, function () {
// This function is executed when the job stops
},
true /* Start the job right now */
);