const { Users } = require( '../models' );


const usersControllers = {
   // Route to create a new user
   createUser({ body }, res ) {
      Users.create( body )
      .then ( dbUsersData => res.json( dbUsersData ))
      .catch( err => res.status( 400 ).json( err ));
   },

   // Route to retrieve all users
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
   }
};


module.exports = usersControllers;