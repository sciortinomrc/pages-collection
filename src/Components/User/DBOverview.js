import React from 'react';
import "./DBOverview.css";

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
			<div><div>USER ID</div>
			<div>USER FAVOURITES COUNT</div></div>
				{
					this.state.users.map(user=>{
						return(
							<div>
								<div> user.id </div>
								<div> user.fav.length </div>
							</div>
						)
					})
				}
			</React.Fragment>)
	}
	databasePanel=()=>{
		return(
			<React.Fragment>
			<div><div>PAGE ID</div>
			<div>PAGE NAME</div>
			<div>PAGE PICTURE</div>
			<div>PAGE URL</div>
			<div>PAGE FAVOURITES COUNT</div>
			<div>COUNTRY</div>
			<div>CATEGORY</div>
			<div>CREATEDBY</div>
			<div>FLAG</div></div>
				{
					this.state.database.map(page=>{
						return(
							<div>
								<div> page.id </div>
								<div> page.name </div>
								<div><img src={page.picture} alt /> </div>
								<div> <a href={page.url} target="_blank">LINK</a></div>
								<div> page.favourite</div>
								<div> page.country</div>
								<div> page.category</div>
								<div> page.createdby</div>
								<div> page.flag</div>
							</div>
						)
					})
				}
			</React.Fragment>)
	}
	visitsPanel=()=>{
		return(
			<React.Fragment>
			<div><div>DATE</div>
			<div>VISITORS</div></div>
				{
					this.state.visits.map(visit=>{
						return(
							<div>
								<div> visit.date </div>
								<div> visit.visit </div>
							</div>
						)
					})
				}
			</React.Fragment>)
	}
	render(){
		return(
		<div id="overview">
		{(this.state.visits)?
			(<React.Fragment>
			<div id="users">
			{this.usersPanel()}
			</div>
			<div id="database">
			{this.databasePanel()}
			</div>
			<div id="visits">
			{this.visitsPanel()}
			</div>
			</React.Fragment>):
			""
		}
		</div>
		)
	}
}
export default DBOverview;