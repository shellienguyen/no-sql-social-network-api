const router = require( 'express' ).Router();

const {
   createUser,
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser
} = require( '../../controllers/users-controller' );

// Route to /api/users
router.route( '/' ).get( getAllUsers ).post( createUser );

//Route to /api/users/:id
router.route( '/:id' ).get( getUserById ).put( updateUser ).delete( deleteUser );

module.exports = router;