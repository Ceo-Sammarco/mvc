

var express = require( "express" ),
	router = express.Router(),
	userController = require( "../controller/usersController" );


router.post( "/cadastro", userController.userRegistration ); 
router.post( "/loggin", userController.loggin );
router.get( "/naologado", userController.notLoggedIn );



module.exports = router;
