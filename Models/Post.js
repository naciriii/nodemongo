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
module.exports = mongoose.model('post',PostSchema,'posts');