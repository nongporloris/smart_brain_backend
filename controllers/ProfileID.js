const handleProfileID = (req,res,knex) =>{

	const {id} = req.params;
	
	knex.select('*').from('users').where({
		id : id
	})
	.then(response => {
		if(response.length === 0){
			res.status(400).json('Error to find the user');
		}else{
			res.json(response[0])
		}
		
	})
	.catch(error => res.status(400).json('Error to find the user'))

	// res.status(404).json('Not found the user');
}
module.exports ={
	handleProfileID
}