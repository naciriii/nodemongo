const mongoose  = require('mongoose');
let url = "mongodb+srv://nacer:moslem1990@database-qltrm.mongodb.net/test?retryWrites=true" 

mongoose.connect(url);
let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
module.exports = db;