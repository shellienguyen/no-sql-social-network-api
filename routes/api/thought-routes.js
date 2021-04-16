const router = require( 'express' ).Router();

const { 
   createThought,
   getAllThoughts,
   getThoughtsById,
   updateThought,
   deleteThought,
   addReaction,
   deleteReaction
} = require ( '../../controllers/thoughts-controller' );

// Route to /api/thoughts
router.route( '/' ).get( getAllThoughts );

// Remember that the callback function of a route method has req and res
// as parameters, so we don't have to explicitly pass any arguments to the functions.

// Route to /api/thoughts/:id
router.route( '/:id' ).get( getThoughtsById ).put( updateThought ).delete( deleteThought );

// Route to /api/thoughts/:userId
router.route( '/:userId' ).post( createThought );

// Route to /api/thoughts/:thoughtId/reactions
router.route( '/:thoughtId/reactions' ).post( addReaction );

// Route to /api/thoughts/:thoughtId/reactions/:reactionId
router.route( '/:thoughtId/reactions/:reactionId' ).delete( deleteReaction );


module.exports = router;