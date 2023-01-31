

const bcrypt = require( "bcrypt" ),
	saltRounds = 10,
	{ sequelize, Usuario } = require( "../models/index" );


const userController = {
	userRegistration: ( req, res ) => {
		const { txt, email, pswd, tel } = req.body,
        
			hash = bcrypt.hashSync( pswd, saltRounds ),
        
			createUser = async() => {
				const user = await Usuario.create( {
					nome: txt,
					email: email,
					senha: hash,
					telefone: tel
				} );
			};

		createUser();
		console.log( "oi" );
		res.redirect( "/" );
	},

	loggin: async( req, res ) => { 
		const { email, pswd } = req.body,
        
			user = await Usuario.findOne( { where: { email: email } } );
        
		if( user === null ) {
			res.redirect( "/users/naologado" );
		} else {
			const resultadoSenha = bcrypt.compareSync( pswd, user.senha );
			if( resultadoSenha && email == user.email ) {
				req.session.user = email;
				res.redirect( "/produtos1" );
				console.log( req.session );
			}
		}   
	},

	notLoggedIn: ( req, res ) => {
		res.render( "usuarioNaoLogado" );
	}

};


module.exports = userController;