

function validateUser( req, res, next ) {
	const user = req.session.user;

	user ?
		next() : res.redirect( "/" );
}


module.exports = validateUser;