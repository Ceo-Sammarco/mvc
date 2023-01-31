

var express = require( "express" ),
	router = express.Router(),
	indexController = require( "../controller/indexController" ),
	validateLoggedInUser = require( "../middleware/validateLoggedInUser" );


router.get( "/", indexController.home );

router.get( "/produtos1", indexController.produtos );

// router.get('/carrinho', indexController.carrinho);

router.get( "/loggin", indexController.loggin );

router.get( "/cartao", indexController.cardRegistration );

router.post( "/carrinho", validateLoggedInUser, indexController.enviarOsPedidosAoCarrinho );

// router.get('/pagamento', validateLoggedInUser, indexController.pagamento);

router.post( "/sucesso", indexController.enviarOsPedidosAoDatabase );






module.exports = router;