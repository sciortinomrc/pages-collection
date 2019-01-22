import React, {Component} from 'react';
import {connect } from 'react-redux';
import {newPage} from '../../State/actions.js';
import { CountryDropdown } from 'react-country-region-selector';
import "./Add.css";

const mapStateToProps=state=>{
	return{
		user: state.onLogin.loggedUser,
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
	const username=this.props.user.id;
	document.getElementById('id').value="";
	document.getElementById('category').value="";
	const {id, category, country}=this.state;
	let splitId="";
	if(id.length && category.length && country.length){
		if(id.includes("-")){
			splitId=id.split("-");
			splitId=splitId[splitId.length-1];
		}
		else splitId=id;
		const KEY="AIzaSyAIlsTN7qyrUVTR2eaZ0YCBFEQiUiF7AkM";
		const ENGINE="001070113199472549264:vzktzi43pzq";
		fetch(`https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${ENGINE}&q=facebook ${splitId}`)
		.then(googleApiResp=>googleApiResp.json())
		.then(searchResult=>{
			let found=false;
			let name="";
			for(let item of searchResult.items){
				if(item.link.includes(`facebook.com/${id}`)){
					found=true;
					name=item.title.split("-")[0]
					break;
				}
			}
			if(found){
					const picture=`https://graph.facebook.com/${splitId}/picture?type=large`;
					fetch('https://peaceful-everglades-81846.herokuapp.com/newpage',{
						method: 'post',
						headers:{ "Content-Type":"application/json"},
						body: JSON.stringify({
							category,
							country,
							createdby: username,
							id: splitId,
							url: `https://facebook.com/${splitId}`,
							picture,
							name
						})
					})
					.then(response=>response.json())
					.then(data=>{
						this.props.addNewPage(data.db, data.message)
					})
			}
			else	this.props.addNewPage(undefined,'Page not found')
		})

	}else{this.props.addNewPage(undefined,'You need to complete the form.')
	}
	this.setState({country: '', id: '', category: ''})
}

	selectCountry (val) {
	this.setState({ country: val });
	}

render(){
	const {country}=this.state;
return(
	<div id="add-wrapper">
		<div >
			<h2 >How does it work?</h2>
			<hr/>
			<p >
			The idea behind this website is to make it easier for you
			get the best selection of Facebook Pages based on categories.<br/>
			What's the best part? Well, You get to add new pages to our database and you get to choose the category!<br />
			How awesome is that?<br/>
			So let's get it started. All you need is the Facebook page ID and the category; we do the rest.
			</p>
			<h2 >Let's get it started</h2>
			<hr/>
			<p >
			Here's what you have to do:
			</p>
			<ul >
				<li>Open the Facebook page URL</li>
				<li>Get the page ID [ https://facebook.com/<b>PAGE-ID</b> ]</li>
				<li>Paste it below, insert a Category and simply click Add Page</li>
			</ul>
			<hr/>
			
		</div>
		<div id="add" >
			<h2 >Add your page here </h2>
			<div >
				<div >
					<input id="id" type="text" placeholder="Page ID" onChange={this.onInputsChange}/>
					<input id="category" type="text"  placeholder="Category" onChange={this.onInputsChange}/>
				       	<CountryDropdown
				          value={country}
				          onChange={(val) => this.selectCountry(val)} />
				</div>
				<div >
					<input type="button"  value="Add" onClick={this.stateCheck}/>
				</div>
			</div>
				<p >{this.props.message}</p>
		</div>
	</div>
	)
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Add);