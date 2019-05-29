const mongoose  = require('mongoose');
let url = "mongodb://nacer:moslem1990@cluster0-shard-00-00-tksix.mongodb.net:27017,cluster0-shard-00-01-tksix.mongodb.net:27017,cluster0-shard-00-02-tksix.mongodb.net:27017/Learning?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"; 


mongoose.connect(url, { useNewUrlParser: true });
let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to db ')
});
