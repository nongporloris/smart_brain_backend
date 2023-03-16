//Remember important library
//const express = require('express');
//const cors = require('cors');
//const bodyParser = require('body-parser');

//const app = express();
//app.use(cors());
//app.use(bodyParser.json());  **** this might not need to use becaurse the new express library ****


const express = require('express');
const bodyParser = require('body-parser');	// read the json format form the body component
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const Signin = require('./controllers/Signin');
const Register = require('./controllers/Register');
const ProfileID = require('./controllers/ProfileID');
const Image= require('./controllers/Image');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'dpg-cg9h7v9mbg54mbf2cqf0-a',
    port : 5432,
    user : 'nongporloris',
    password : 'tgjKsHlh6qYSlE4YrGqKHNi9CxojiNQL',
    database : 'smartbrain_3pnt'
  }
});

// knex.select('*').from('users').then(data => {
// 	console.log(data);
// });



const app = express();

app.use(bodyParser.json());
app.use(cors());



const database = {
	user:[
		{	id:'123',
			name: 'John',
			email: 'john@gmail.com',
			password : '13579',
			entries : '0',
			joined :new Date,

		},
		{
			id:'124',
			name: 'Nongpor',
			email: 'nongpor@gmail.com',
			password : 'por_13579',
			entries : '0',
			joined :new Date,

		}
	],

	login :[
			{
				id: '987',
				hash: '',
				email : 'john@gmail.com',
			},

		]
}




// Remember get,put,post,delete with request and response

app.get('/', (req, res)=>{
	res.send('connect to smart-brain db');
})


app.post('/signin',(req,res)=>{Signin.handleSignin(req,res,bcrypt,knex)});

app.post('/register',(req,res) => {Register.handleRegister(req,res,knex,bcrypt)})

// app.get('/test', (req,res) =>{

// 	const userTemp = database.user.map(mapUser =>{
// 		return mapUser;
// 	})

// 	res.json(userTemp);
// })
app.get('/profile/:id', (req,res) =>{ProfileID.handleProfileID(req,res,knex)})


//PUT the imageEntries to the user and increase the count++
app.put('/image',(req,res) =>{Image.handleImage(req,res,knex)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3001, () =>{
	console.log('app is running on port 3,001');
});

// res = this is working.
//signin => POST success of fail
//register => POST new user

//profile : userID => GET user
//image posting =>PUT user
