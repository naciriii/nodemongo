const mongoose = require('mongoose');
const schema = mongoose.Schema;

let bookSchema = new schema(
    {
        title:string,
        pages:number

    }
)
module.exports = mongoose.model('Book',bookSchema, 'books');