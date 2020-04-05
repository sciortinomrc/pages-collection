import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from '../Components/ErrorBoundary';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {login,logout} from '../classes/users';


import '../css/fontello.css';
import '../css/animation.css';
import Top from '../Components/Top/Top'; import Scroller from '../Components/Home/Scroller';
import Bottom from '../Components/Bottom'; import Add from '../Components/Add/Add'; 
import Home from '../Components/Home/Home'; import Card from '../Components/Main/Card';
import DisplayPages from '../Components/Main/DisplayPages'; import UserPanel from "../Components/User/UserPanel";
import DBOverview from '../Components/User/DBOverview'; import About from "../Components/About/About.js";
import './App.css';
import { windowResize, handlePages, updateLoginStatus, newVisit } from '../State/actions.js'

const mapStateToProps = state => {
	return {
		user: state.loginStatus.user,
		pages: state.handlePages.pages,
		size: state.onWindowResize.size
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		handlePages: async () => dispatch(await handlePages()),
		onWindowResize: (size) => dispatch(windowResize(size)),
		updateLoginStatus: (user)=>dispatch(updateLoginStatus(user)),
		newVisit: async()=> dispatch(await newVisit())
	}
}
class App extends Component {
	constructor(){
		super();
		this.state={
			cardToDisplay: null
		}
	}

	login=async()=>{
		try{
			const user = await login();
			this.props.updateLoginStatus(user);
		}
		catch(e){
			this.props.updateLoginStatus(null)
		}
	}
	
	logout=async()=>{
		try{
			const user = await logout();
			this.props.updateLoginStatus(user);
		}
		catch(e){
			this.props.updateLoginStatus(null);
		}
	}

	componentWillMount(){
		if(window.location.pathname.length>1 && !localStorage.userID)
			window.location.pathname="/";
		
		if(Date.now()>localStorage.timestamp) localStorage.clear();
	}

	waitForFB=()=>{
		setTimeout(async ()=>{
			await new Promise((resolve)=>{
				if(!window.FB){
					this.waitForFB();
					resolve();
					return;
				}
				this.props.login(true);
				resolve();
			})
		},1000)
	}

	componentDidMount() {
		this.props.handlePages();

		if(!window.location.search.includes("itsme"))
			this.props.newVisit();
			
		this.waitForFB();
		// resize event listener
		window.addEventListener('resize', () => {
			this.props.onWindowResize([window.innerWidth, window.innerHeight])
		})
	}

	resetState = () => {
		this.setState({ userName: "" })
	}

	//display single card
	displaySingleCard = (card) => {
		return (
			
			<Card
				id={card.id}
				name={card.name}
				type={card.type}
				picture={card.picture}
				url={card.url}
				favourites={card.favourites}
				likes={card.likes}
				category={card.category}
				country={card.country}
			/>
		)
	}

	//filter favourites from pages
	filterFavourites = () => {
		if (!this.props.user || !this.props.user.id) return this.props.pages;
		return this.props.pages.filter(record => {
			return this.props.user.favourites.some(fav => fav === record.id)
		})
	}


	//renders the page based on the state
	tabsRouter = () => {
		const { pages, readStateMessage, user, category } = this.props;
		return (
			<Switch>
				<Route exact path="/">
					<Home pages={pages} user={user}/>
				</Route>
				<Route exact path="/display">
					<DisplayPages category={category} pages={pages}/>
				</Route>
				<Route exact path="/card">
					<div id="single-card">{this.state.cardToDisplay?this.displaySingleCard(this.state.cardToDisplay):""}</div>
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				user?<React.Fragment>
				<Route exact path="/add">
					<Add readMessage={readStateMessage}/>
				</Route>
				<Route exact path="/favourites">
					<DisplayPages category='all' pages={this.filterFavourites()}/>
				</Route>
				<Route exact path="/user">
					<UserPanel pages={pages} user={user} name={this.state.userName}/>
				</Route>
				<Route exact path="/overview">
				<DBOverview />
				</Route> 
				</React.Fragment>:""
				}
			</Switch>
		)
	}
	setCardToDisplay=(card)=>{
		this.setState({cardToDisplay: card})
	}

	//render method
	render() {
		
		return (
			<div id="main">
				<Router>
					<Top login={this.props.login} logout={this.props.logout} user={this.props.user} pages={this.props.pages} setCardToDisplay={this.setCardToDisplay} />
					{
						(this.props.pages) ?
							<Scroller>
								<ErrorBoundary>
									{this.tabsRouter()}
								</ErrorBoundary>
							</Scroller>
							:
							<div id="loading" >
								<i className="fab icon-spin5 animate-spin"></i>
								<h1>Getting data from Facebook</h1>
							</div>
					}

				</Router>
				<Bottom height={this.props.size[1]} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);