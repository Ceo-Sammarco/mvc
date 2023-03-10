var createError = require( "http-errors" ),
	express = require( "express" ),
	path = require( "path" ),
	cookieParser = require( "cookie-parser" ),
	logger = require( "morgan" ),
	session = require( "express-session" ),
	app = express();

var indexRouter = require( "./src/routes/index" ),
	usersRouter = require( "./src/routes/users" );
    
const { config } = require( "process" );

// var funcoes = require('./funcoes');


// app.locals.funcoes = funcoes;

// view engine setup
app.set( "views", path.join( __dirname, "src/views" ) );
app.set( "view engine", "ejs" );

app.use( logger( "dev" ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, "src/public" ) ) );

app.use( session( {
	resave: true,
	saveUninitialized: true,
	secret: "palavraSecreta"
} ) );

app.use( "/", indexRouter );
app.use( "/users", usersRouter );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
	next( createError( 404 ) );
} );

// error handler
app.use( function( err, req, res, next ) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get( "env" ) === "development" ? err : {};

	// render the error page
	res.status( err.status || 500 );
	res.render( "error" );
} );

module.exports = app;


// const myFunction = async() => {
// 	const { sequelize, Lanche } = require( "./models/index.js" );

// 	const novoAcompanhamento = await Lanche.create( {
// 		nome: "Heat Burguer Triplo",
// 		valor: 31
// 	} );
// 	return novoAcompanhamento;
// };
// myFunction();
