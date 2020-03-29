import React from 'react';
import "./DBOverview.css";
import MyChart from "./Chart.js";
import {connect} from "react-redux";
import {handlePages,handleUsers,handleVisits} from "../../State/actions";

const mapStateAsProps=state =>{
	return{
		users: state.handleUsers.users,
		pages: state.handlePages.pages,
		visits: state.handleVisits.visits
	}
}

const mapDispatchAsProps=dispatch=>{
	return{
		overview: async()=>{
			dispatch(await handleUsers());
			dispatch(await handlePages());
			dispatch(await handleVisits());
		}
	}
}

class DBOverview extends React.Component{

	componentDidMount(){
		this.props.overview();
	}
	usersPanel=()=>{
		return(
			<React.Fragment>
			<div>
				<div>USER PIC</div>
				<div>USER ID</div>
				<div>USER FAVOURITES COUNT</div>
			</div>
				{
					this.props.users.map(user=>{
						return(
							<div key={user.id}>
								<div> <img src={`https://graph.facebook.com/v6.0/${user.id}/picture?height=200`} alt="user pic" /> </div>
								<div> {user.id} </div>
								<div> {user.favourites.length} </div>
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
				<div>PAGE FAVOURITES COUNT</div>
				<div>PAGE LIKES COUNT</div>
				<div>COUNTRY</div>
				<div>CATEGORY</div>
				<div>TYPE</div>
				<div>CREATEDBY</div>
			</div>
				{
					this.props.pages.map(page=>{
						return(
							<div key={page.id}>
								<div> {page.id} </div>
								<div> <a href={"https://facebook.com/"+page.id} target="_blank" rel="noopener noreferrer">{page.name}</a> </div>
								<div><img src={`https://graph.facebook.com/v6.0/${page.id}/picture?height=200`} alt="" /> </div>
								<div> {page.favourites}</div>
								<div> {page.likes}</div>
								<div> {page.country}</div>
								<div> {page.category}</div>
								<div> {page.type}</div>
								<div> {page.createdby}</div>
							</div>
						)
					})
				}
			</React.Fragment>)
	}
	render(){
		if(this.props.visits.length)this.props.visits.sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))
		return(
			<div id="overview">
				{
					(this.props.visits.length)?
					<React.Fragment>
					<h1>VISITS</h1>
					<MyChart data={this.props.visits} />
					</React.Fragment> : ""
				}
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
			</div>
		)
	}
}
export default connect(mapStateAsProps, mapDispatchAsProps)(DBOverview);