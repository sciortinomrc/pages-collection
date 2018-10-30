const express = require('express');
const bodyParser= require ('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const knex=require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : ' ',
    database : 'fbpages'
  }
});

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//get pages DB
app.get('/', (req,res)=>{
	knex.select('*').from('database')
	.then(data=>res.send(data))
})
//update pages DB
app.post('/newpage',(req,res)=>{
	const {id, category, country} = req.body;
	if(knex('database').where({id: id}).length){
		res.status(400).send("The page already exists")
	}
	else{
		knex('database').returning('*').insert({id: id, category: category, country: country, favourite:0})
		.then(response=>res.send(response[0]))
	}
})

app.post('/login',(req,res)=>{
	const {user,password}=req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		knex('hash').where({id: user}).select('password')
		.then(pass=> pass[0].password)
		.then(pwd=>{
			bcrypt.compare(password, pwd, function(err, resp) {
				if(resp){
					knex('users').where({id: user}).select('*')
					.then(data=> res.send(data[0]))
				}
				else{
					res.status(400).send("Error - Username and password do not match our record")
				}
			});
		})
		.catch(err=>res.status(400).send("Error - Something went wrong. Please try again") ) 
	});
})

app.post('/register', (req,res)=>{
	const {user,password,email}=req.body;
	if(knex('users').where({id: user}).length){
		res.status(400).json("Account not created");
	}
	else{
		knex('users').insert({id: user, email: email, fav: []})
		.then( response=> {
			bcrypt.hash(password, null, null, function(err, hash) {
				knex('hash').insert({id: user, password: hash})
				.then(response=> res.json("Account created"))
			});
		})
	}

})

app.post('/updatefavs',(req,res)=>{
	const {user,id} = req.body;
	let pagesDatabase,userToSend;
	knex('users').where({id: user}).select('fav')
	.then(favList=>{
		const fav=favList[0].fav;
		if(fav.includes(id)){
			knex('database').where('id','=',id).decrement('favourite',1)
			.then(resp=>{
				knex('users').where({id: user}).select('fav')
				.then(fav=>{
					knex('users').where({id: user}).returning('*').update({
						fav: fav[0].fav.filter(favId=>favId!==id)
					})
					.then(r=>{
						knex.select('*').from('database').orderBy('favourite','desc')
						.then(pagesDatabase=>{
							knex('users').where({id: user})
							.then(userToSend=>{
								res.send({pagesDatabase, userToSend: userToSend[0], update:true})
							})
						})
					})
				})
			})
		}
		else{
			knex('database').where({id:id}).increment('favourite',1).returning('*')
			.then(record=>{
				knex('users').where({id: user}).select('fav')
				.then(fav=>{
					fav[0].fav.push(id)
					knex('users').where({id: user}).returning('*').update({
						fav: fav[0].fav
					})
					.then(r=>{
						knex.select('*').from('database').orderBy('favourite','desc')
						.then(pagesDatabase=>{
							knex('users').where({id: user})
							.then(userToSend=>{
								res.send({pagesDatabase, userToSend: userToSend[0], update:true})
							})
						})
					})
				})
			})
		}
	})
})






app.listen(3001, ()=>{console.log('listening on 3001')})