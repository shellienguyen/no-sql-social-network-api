const { Users } = require( '../models' );


const usersControllers = {
   // Route to create a new user
   createUser({ body }, res ) {
      Users.create( body )
      .then ( dbUsersData => res.json( dbUsersData ))
      .catch( err => res.status( 400 ).json( err ));
   },

   // Route to retrieve all users
   /*
   Note that we also used the select option inside of populate(),
   so that we can tell Mongoose that we don't care about the __v
   field. The minus sign - in front of the field
   indicates that we don't want it to be returned. If we didn't have
   it, it would mean that it would return only the __v field.
   */
   getAllUsers( req, res ) {
      Users.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select( '-__v' )
      .sort({ _id: -1 })
      .then ( dbUsersData => res.json( dbUsersData ))
      .catch( err => {
         console.log( err );
         res.status( 500 ).json( err );
      });
   },

   // Route to retrieve a single user by ID
   getUserById({ params }, res ) {
      Users.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select( '-__v' )
      .then ( dbUsersData => {
         if ( !dbUsersData ) {
            res.status( 404 ).json({ message: 'No user found with this ID!' });
            return;
         };

         res.json( dbUsersData );
      })
      .catch( err => {
         console.log( err );
         res.status( 400 ).json( err );
      });
   },

   // Route to update a user data
   /*
   With this .findOneAndUpdate() method, Mongoose finds a single document
   we want to update, then updates it and returns the updated document.
   If we don't set that third parameter, { new: true }, it will return the
   original document. By setting the parameter to true, we're instructing
   Mongoose to return the new version of the document.
   */
   updateUser({ params, body }, res ) {
      Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then( dbUsersData => {
         if ( !dbUsersData ) {
            res.status( 404 ).json( { message: 'No user found with this ID!' });
            return;
         };

         res.json( dbUsersData );
      })
      .catch( err => res.json( err ));
   },

   // Route to delete a user
   deleteUser({ params }, res ) {
      Users.findOneAndDelete({ _id: params.id })
      .then( dbUsersData => {
         if ( !dbUsersData ) {
            res.status( 404 ).json( { message: 'No user found with this ID!' });
            return;
         };

         res.json( dbUsersData );
      })
      .catch( err => res.status( 400 ).json( err ));
   },

   // Route to add a friend
   addFriend({ params }, res ) {
      Users.findOneAndUpdate({ _id: params.id },
                             { $push: { friends: params.friendId }},
                             { new: true })
      .populate({ path: 'friends', select: ( '-__v' )})
      .select( '-__v' )
      .then( dbFriendData => {
         if ( !dbFriendData ) {
            res.status( 400 ).json({ message: 'No user found with this ID!' });
            return;
         };

         res.json( dbFriendData );
      })
      .catch( err => res.json( err ));
   },

   // Route to delete a friend
   deleteFriend({ params }, res ){
      Users.findOneAndUpdate({ _id: params.id },
                             { $pull: { friends: params.friendId }},
                             { new: true })
      .populate({ path: 'friends', select: '-__v' })
      .select( '-__v' )
      .then( dbFriendData => {
         if ( !dbFriendData ) {
            res.status( 404 ).json({ message: 'No user found with this ID!' });
            return;
         };

         res.json( dbFriendData );
      })
      .catch( err => res.statu( 400 ).json( err ));
   }
};


module.exports = usersControllers;