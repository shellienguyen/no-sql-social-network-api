const router = require( 'express' ).Router();

const { 
   createThought,
   getAllThoughts,
   getThoughtsById
} = require ( '../../controllers/thoughts-controller' );

// Route to /api/thoughts
router.route( '/' ).get( getAllThoughts );

// Route to /api/thoughts/:id
router.route( '/:id' ).get( getThoughtsById );//.put( updateThoughts ).delete( deleteThoughts );

// Route to /api/thoughts/:userId
router.route( '/:userId' ).post( createThought );

module.exports = router;