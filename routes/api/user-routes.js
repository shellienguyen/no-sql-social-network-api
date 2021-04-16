const router = require( 'express' ).Router();

const {
   createUser,
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser,
   addFriend,
   deleteFriend
} = require( '../../controllers/users-controller' );

// Remember that the callback function of a route method has req and res
// as parameters, so we don't have to explicitly pass any arguments to the functions.

// Route to /api/users
router.route( '/' ).get( getAllUsers ).post( createUser );

// Route to /api/users/:id
router.route( '/:id' ).get( getUserById ).put( updateUser ).delete( deleteUser );

// Route to /api/users/:userId/friends/:friendId
router.route( '/:id/friends/:friendId' ).post( addFriend ).delete( deleteFriend );

module.exports = router;