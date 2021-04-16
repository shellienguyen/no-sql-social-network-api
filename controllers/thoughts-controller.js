const { Users, Thoughts } = require( '../models' );


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
   /*
   Note that we also used the select option inside of populate(),
   so that we can tell Mongoose that we don't care about the __v
   field on thoughts either. The minus sign - in front of the field
   indicates that we don't want it to be returned. If we didn't have
   it, it would mean that it would return only the __v field.
   */
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
   },

   // Route to update a thought
   /*
   With this .findOneAndUpdate() method, Mongoose finds a single document
   we want to update, then updates it and returns the updated document.
   If we don't set that third parameter, { new: true }, it will return the
   original document. By setting the parameter to true, we're instructing
   Mongoose to return the new version of the document.
   */
   updateThought({ params, body }, res ) {
      Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .populate({ path: 'reactions', select: '-__v' })
      .select( '-__v' )
      .then( dbThoughtsData => {
         if ( !dbThoughtsData ) {
            res.status( 404 ).jason({ message: 'No thought found with this ID!' });
            return;
         };

         res.json( dbThoughtsData );
      })
      .catch( err => res.json( err ));
   },

   // Route to delete a thought
   deleteThought({ params }, res ) {
      Thoughts.findOneAndDelete({ _id: params.id })
      .then( dbThoughtsData => {
         if ( !dbThoughtsData ) {
            res.status( 404 ).json({ message: 'No thought found with this ID!' });
            return;
         };

         res.json( dbThoughtsData );
      })
      .catch( err => res.status( 400 ).json( err ));
   },

   // Route to add a reaction
   addReaction({ params, body }, res ) {
      Thoughts.findOneAndUpdate({ _id: params.thoughtId },
                                { $push: { reactions: body }},
                                { new: true, runValidators: true })
      .populate({ path: 'reactions', select: '-__v' })
      .select( '-__v' )
      .then( dbReactionData => {
         if ( !dbReactionData ) {
            res.status( 404 ).json({ message: 'No thought found with this ID!' });
            return;
         };

         res.json( dbReactionData );
      })
      .catch( err => res.status( 400 ).json( err ));
   },

   // Route to delete a reaction
   deleteReaction({ params }, res ) {
      Thoughts.findOneAndUpdate({ _id: params.thoughtId },
                                { $pull: { reactions: { reactionId: params.reactionId }}},
                                { new: true })
      .then( dbReactionData => {
         if ( !dbReactionData ) {
            res.status( 404 ).json({ message: 'No thought found with this ID!' });
            return;
         };

         res.json( dbReactionData );
      })
      .catch( err => res.status( 400 ).json( err ));
   }
};


module.exports = thoughtsController;