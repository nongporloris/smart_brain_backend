const handleSignin =(req, res, bcrypt, knex) =>{

	const {email, password} = req.body;

	knex.select('email','hash').from('login')
	.where({email : email})
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash)
		if(isValid){
			knex.select('*').from('users').where({
				email : email
			})
			.then(user => res.json(user[0]))
			.catch(error => res.status(400).json('Error to connect the user'))
		}else{
			res.status(400).json('Wrong password');
		}
	})
	.catch(error => res.status(400).json('No user match'))



}

module.exports = {

	handleSignin
}

