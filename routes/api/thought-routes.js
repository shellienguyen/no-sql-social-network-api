const router = require( 'express' ).Router();

const { 
   createThought,
   getAllThoughts,
   getThoughtsById,
   updateThought,
   deleteThought
} = require ( '../../controllers/thoughts-controller' );

// Route to /api/thoughts
router.route( '/' ).get( getAllThoughts );

// Route to /api/thoughts/:id
router.route( '/:id' ).get( getThoughtsById ).put( updateThought ).delete( deleteThought );

// Route to /api/thoughts/:userId
router.route( '/:userId' ).post( createThought );

module.exports = router;