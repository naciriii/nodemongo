const mongoose = require('mongoose');
const schema  = mongoose.Schema;
let PostSchema = new mongoose.Schema({
    title: {
        type:"string"
    },
    pages: {type:"number"
    },
    author: {type:schema.Types.ObjectId, ref: 'User'}
})
PostSchema.statics.bulkInsert = async function(data) {
    let ids = [];
  for(d in data) {
        let post = new this(data[d]);
        let doc = await post.save();
            ids.push(doc);
      
      
    }
    return ids.map(el => el._id);
}
module.exports = mongoose.model('post',PostSchema,'posts');