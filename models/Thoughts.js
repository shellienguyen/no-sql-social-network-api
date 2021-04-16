const { Schema, model, Types } = require( 'mongoose' );
const dateFormat = require( '../utils/dateFormat' );


const ReactionsSchema = new Schema (
   {
      // Create custom ID
      reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
      reactionBody: { type: String, required: true, minlength: 1, maxlength: 280 },
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now,
         get: createdAtVal => dateFormat( createdAtVal )}
   },
   { toJSON: { getters: true } }
);


const ThoughtsSchema = new Schema (
   {
      thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
      createdAt: { type: Date, default: Date.now,
         get: createdAtVal => dateFormat( createdAtVal )},
      username: { type: String, required: true },
      reactions: [ ReactionsSchema ]
   },
   {
      toJSON: { virtuals: true, getters: true },
      id: false
   }
);


// Retrieve the total count of reactions
ThoughtsSchema.virtual( 'reactionCount' ).get( function() {
   return this.reactions.length;
});


const Thoughts = model( 'Thoughts', ThoughtsSchema );


module.exports = Thoughts;