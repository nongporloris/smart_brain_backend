const handleImage = (req,res,knex) =>{

	const {id} = req.body;
	let entriesTemp = 0;
	
	knex('users').where({id:id})
	.increment('entries', 1)
	.returning('entries') // use to return column with delete, instert, update
	.then(response => {
		if(response.length === 0){
			res.status(400).json('Sorry, we have some problem');
			
		}else{
			res.json(response[0].entries)
		}
	})
	.catch(error=> res.status(400).json('Sorry, we have some problem'))
}
module.exports ={
	handleImage
}