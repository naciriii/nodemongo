const mongoose = require('mongoose')
const schema  = mongoose.schema
UserSchema = new schema(
    {
        login:
        {
            type:"string",
            required: true
        },
        password: {
            type: "string",
            required: true
        },
        age:
        {
            type: number,
            required: true
        }
    }
);
module.exports = mongoose.model("User", UserSchema)