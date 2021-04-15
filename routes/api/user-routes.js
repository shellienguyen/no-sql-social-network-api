const router = require( 'express' ).Router();

const {
   createUser,
   getAllUsers,
   getUserById
} = require( '../../controllers/users-controller' );

// Route to /api/users
router.route( '/' ).get( getAllUsers ).post( createUser );

//Route to /api/user/:id
router.route( '/:id' ).get( getUserById );//.put( updateUsers ).delete( deleteUsers );

module.exports = router;