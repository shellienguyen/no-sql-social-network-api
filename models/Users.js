const { Schema, model } = require( 'mongoose' );
const validator = require( 'validator' );


const UsersSchema = new Schema (
   {
      username: { type: String, unique: true, required: true, trim: true },
      email: { type: String, unique: true, required: true,
         validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address!',
            isAsync: false
         }
      },
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts' }],
      friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
   },
   {
      toJSON: { virtuals: true, getters: true },
      id: false
   }
);


// Retrieve the total friends count
UsersSchema.virtual( 'friendCount' ).get( function () {
   return this.friends.length;
});


const Users = model( 'Users', UsersSchema );


module.exports = Users;