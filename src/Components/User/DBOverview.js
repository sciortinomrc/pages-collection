import React from 'react';
import "./DBOverview.css";
import MyChart from "./Chart.js"

class DBOverview extends React.Component{
	constructor(){
		super()
		this.state={
			users: [],
			database: [],
			visits: []
		}
	}
	componentDidMount(){
		fetch("https://peaceful-everglades-81846.herokuapp.com/overview")
		.then(resp=>resp.json())
		.then(result=>{
			this.setState({
				users: result.users,
				database: result.database,
				visits: result.visits
			})
		})
	}
	usersPanel=()=>{
		return(
			<React.Fragment>
			<div>
				<div>USER ID</div>
				<div>USER FAVOURITES COUNT</div>
			</div>
				{
					this.state.users.map(user=>{
						return(
							<div key={user.id}>
								<div> {user.id} </div>
								<div> {user.fav.length} </div>
							</div>
						)
					})
				}
			</React.Fragment>)
	}
	databasePanel=()=>{
		return(
			<React.Fragment>
			<div>
				<div>PAGE ID</div>
				<div>PAGE NAME</div>
				<div>PAGE PICTURE</div>
				<div>PAGE URL</div>
				<div>PAGE FAVOURITES COUNT</div>
				<div>COUNTRY</div>
				<div>CATEGORY</div>
				<div>CREATEDBY</div>
				<div>FLAG</div>
			</div>
				{
					this.state.database.map(page=>{
						console.log(page.flag)
						return(
							<div key={page.id}>
								<div> {page.id} </div>
								<div> {page.name} </div>
								<div><img src={page.picture} alt="" /> </div>
								<div> <a href={page.url} target="_blank" rel="noopener noreferrer">LINK</a></div>
								<div> {page.favourite}</div>
								<div> {page.country}</div>
								<div> {page.category}</div>
								<div> {page.createdby}</div>
								<div> {(page.flag)?"TRUE":"FALSE"} </div>
							</div>
						)
					})
				}
			</React.Fragment>)
	}
	render(){
		if(this.state.visits.length)this.state.visits.sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))
		return(
		<div id="overview">


			
		{(this.state.visits.length)?
			<React.Fragment>
				<h1>VISITS</h1>
				<MyChart data={this.state.visits} />
				<h1>USERS</h1>
				<div id="users">
				{this.usersPanel()}
				</div>
				<hr />
				<h1>DATABASE</h1>
				<div id="database">
				{this.databasePanel()}
				</div>
				<hr />
			</React.Fragment>:""
		}
		</div>
		)
	}
}
export default DBOverview;