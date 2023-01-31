

const { sequelize, Pedido } = require( "../models/index" );


const indexController = {
	home: ( req, res ) => {
		res.render( "pg-home" );
	},

	produtos: ( req, res ) => {
		res.render( "pg-produtos" );
	},
    
	produtos2: ( req, res ) => {
		res.render( "pg-produtos2-teste" );
	},

	// carrinho: (req, res) => {
	//     servico  = req.body.servico

	//     console.log(req)
	//     if(servico){
	//         res.render('pg-carrinho', {servico: servico})
	//     } else (res.send('<h1>Nao tem produto</h1>'))
	// },

	// pagamento: (req, res) => {
	//     //aqui é a parte de enviar os produtos pra pg pagamento
	//     req.session.servico = servico
	//     console.log(req.session.servico)
	//     console.log(req.session.user)
	//     res.render('pg-pagamento', {servico})
	// },

	loggin: ( req, res ) => {
		res.render( "card-login-e-registro" );
	},

	cardRegistration: ( req, res ) => {
		res.render( "pg-cadastro-cartao" );
	},

	enviarOsPedidosAoCarrinho: ( req, res ) => {
		const servico = req.body;
		// req.session.servico = servico
		const { pao, acompanhamento, bebidas } = servico,
			valorDoPao = parseInt( pao.split( "R$ " )[1].replace( ",", "." ) ),
			valorDoAcompanhamento = parseInt( acompanhamento.split( "R$ " )[1].replace( ",", "." ) ),
			valorDaBebida = parseInt( bebidas.split( "R$ " )[1].replace( ",", "." ) ),
			valorTotal = valorDoPao + valorDoAcompanhamento + valorDaBebida;
        
		servico.valorTotal = valorTotal;
        
		res.render( "pg-carrinho", { servico } );
	}, 

	enviarOsPedidosAoDatabase: ( req, res ) => {
		const { pao, acompanhamento, bebida, total } = req.body;

		const enviarPedido = async() => {
			const pedido = await Pedido.create( {
				pao: pao,
				acompanhamento: acompanhamento,
				bebida: bebida,
				valor: total
			} );
		};

		enviarPedido();
		res.render( "pg-pedidoenviado" );
	}
    
};

module.exports = indexController;