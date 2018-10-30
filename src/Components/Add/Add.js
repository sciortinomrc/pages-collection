import React, {Component} from 'react';
import {connect } from 'react-redux';
import {newPage} from '../../State/actions.js';
import { CountryDropdown } from 'react-country-region-selector';
import "./Add.css";

const mapStateToProps=state=>{
	return{
		database: state.addNewPage.database,
		message: state.addNewPage.message,
		apiMessage: state.fbApiCall.message
	}
}
const mapDispatchToProps=dispatch=>{
	return{
		addNewPage: (db, cards, message)=> dispatch(newPage(db,cards,message))
	}
}

class Add extends Component {
constructor(props){
	super(props)
	this.state={
		country: '', 
		id: '',
		category: ''
	}
}

deliverMessage=()=>{
	return this.props.message;
}

onInputsChange=(event)=>{

	(event.target.id==="id")
	? this.setState({id: event.target.value})
	: this.setState({category: event.target.value.toLowerCase()})
}

stateCheck=(f)=>{
	document.getElementById('id').value="";
	document.getElementById('category').value="";
	const {id, category, country}=this.state;
	if(id.length && category.length && country.length){
		fetch('http://localhost:3001/newpage',{
			method: 'post',
			headers:{ "Content-Type":"application/json"},
			body: JSON.stringify({id,category,country})
		})
		.then(response=>response.json())
		.then(data=>{
			this.props.addNewPage(data.db, data.cards, data.message)
		})
	}else{this.props.addNewPage(undefined,undefined,'You need to complete the form.')
	}
	this.setState({country: '', id: '', category: ''})
}

	selectCountry (val) {
	this.setState({ country: val });
	}

render(){
	const {country}=this.state;
return(
	<div className="full-screen">
		<div className="d-flex flex-column m-auto w-75 border">
			<div className="m-auto rounded border shadow w-75">
				<h2 className="p-0 m-0">How does it work?</h2>
				<hr/>
				<p className="text-left p-2">
				The idea behind this website is to make it easier for you
				get the best selection of Facebook Pages based on categories.<br/>
				What's the best part? Well, You get to add new pages to our database and you get to choose the category!<br />
				How awesome is that?<br/>
				So let's get it started. All you need is the Facebook page ID and the category; we do the rest.
				</p>
				<h2 className="p-0 m-0">Let's get it started</h2>
				<hr/>
				<p className="text-left p-2">
				Here's what you have to do:
				</p>
				<ul className="text-left">
					<li>Copy the Facebook Page URL</li>
					<li>Go to <a href="https://findmyfbid.com/" target="_blank" rel="noopener noreferrer">https://findmyfbid.com/</a> and paste your URL</li>
					<li>Here's your Facebook Page ID. Paste it below, insert a Category and simply click Add Page</li>
				</ul>
				<hr/>
				
			</div>
			<div id="add" className="m-auto rounded border shadow w-75 p-3" >
				<h2 className="p-0 mb-4">Add your page here </h2>
				<div className="d-inline-flex w-75">
					<div className="d-flex flex-column border w-100">
						<input id="id" type="text" className="rounded-left text-center" placeholder="Page ID" onChange={this.onInputsChange}/>
						<input id="category" type="text" className="rounded-left text-center" placeholder="Category" onChange={this.onInputsChange}/>
				       	<CountryDropdown
				          value={country}
				          onChange={(val) => this.selectCountry(val)} />
					</div>
					<div className="h-auto w-15">
						<input type="button" className="h-100 w-100 btn btn-primary" value="Add" onClick={this.stateCheck}/>
					</div>
				</div>
					<p className="mt-2">{this.props.message}</p>
			</div>
		</div>
				
		
	</div>
	)
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Add);