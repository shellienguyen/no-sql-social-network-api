const { Users, Thoughts } = require( '../models' );
const { db } = require('../models/Users');


const thoughtsController = {
   // Route to create a new thought
   createThought({ params, body }, res ) {
      Thoughts.create( body )
      .then(({ _id }) => {
         return Users.findOneAndUpdate({ _id: params.userId },
                                       { $push: { thoughts: _id }},
                                       { new: true });
      })
      .then( dbThoughtsData => {
         if ( !dbThoughtsData ) {
            res.status( 404 ).json( { message: 'No thought found with this ID!' });
            return;
         };

         res.json( dbThoughtsData );
      })
      .catch( err => res.json( err ));
   },

   // Route to retrieve all thoughts
   getAllThoughts( req, res ) {
      Thoughts.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select( '-__v' )
      .sort({ _id: -1 })
      .then( dbThoughtsData => res.json( dbThoughtsData ))
      .catch( err => {
         console.log( err );
         res.status( 500 ).json( err );
      });
   },

   // Route to retrieve thought by ID
   getThoughtsById({ params}, res ) {
      Thoughts.findOne({ _id: params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .select( '-__v' )
      .then( dbThoughtsData => {
         if ( !dbThoughtsData ) {
            res.status( 404 ).json({ message: 'No thought found with this ID!' });
            return;
         };

         res.json( dbThoughtsData );
      })
      .catch( err => {
         console.log( err );
         res.sendStatus( 400 );
      });
   }
};


module.exports = thoughtsController;