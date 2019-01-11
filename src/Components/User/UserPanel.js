import React from "react";
import {useState} from "react";
import {connect} from "react-redux"
import {setPagesDatabase} from  '../State/actions.js'
import './UserPanel.css';

const expand=(id)=>{
	const pic=document.getElementById(id+"picture");
	const picDescription=document.getElementById(id+"description");
	pic.style.transform="scale(1.2)";
	pic.style.border="3px solid #4267b2"
	picDescription.style.width="400px";
	picDescription.style.paddingLeft="50px";
}
const reduce=(id)=>{
	const pic=document.getElementById(id+"picture");
	const picDescription=document.getElementById(id+"description");
	const com=document.getElementById(id+"commands");
	com.style.display="";
	pic.style.transform="";
	pic.style.border="";
	picDescription.style.width="";
	picDescription.style.paddingLeft="";
}
const showCommands=(event,id)=>{
	const com=document.getElementById(id+"commands");
	if(event.target.id!=="F" && event.target.id!=="X"){
		com.style.display.length?
			com.style.display="" :
			com.style.display="grid"
	}
}
const flag=(pageId)=>{
	fetch('https://peaceful-everglades-81846.herokuapp.com/flag', {
		method: 'post',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify({ pageId })
	})
	.then(r=>{})
}
const delPage=(event,pageId,setPageId,setDB)=>{
	const popup=document.getElementById("fullpage");
	if(event.key==="Enter" && event.target.value==="DELETE"){
		fetch('https://peaceful-everglades-81846.herokuapp.com/delete', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({ pageId })
		})
		.then(r=>{
			setDB(r)
		})
		popup.style.display="none";
		setPageId("");
	}
	if(event.key===" "){
		popup.style.display="none"
		setPageId("");
	}
	
}
const light=(event)=>{
	event.target.style.boxShadow="inset 3px 3px 20px rgba(255,255,0,0.3),inset -3px 3px 20px rgba(255,255,0,0.3),inset 3px -3px 20px rgba(255,255,0,0.3),inset -3px -3px 20px rgba(255,255,0,0.3)"
}
const resetLight=(event)=>{
	event.target.style.boxShadow=""
}


const UserPanel=(props)=>{
	const {database,user,name,setDB} = props;
	const [pageId, setPageId] = useState("");
	const db=database.filter(card=>card.createdby===user.id)
	const userPictureURL=`https://graph.facebook.com/${user.id}/picture?type=large`
	return(
		<React.Fragment>
		<h2>
		<img id="userPic" src={userPictureURL} alt=""/>
		{name}</h2>
		{(db.length)?
			<React.Fragment>
			Here's the list of all your pages.
			<hr />
			<div id="list">
			{
				db.map(card=>{
					return(	
					<div key={card.id} id={card.id} className="profileSmallCard" onClick={(e)=>{showCommands(e,card.id)}}  onMouseLeave={()=>reduce(card.id)}>
						<img id={`${card.id}picture`} className="picture" src={card.picture} alt="" onMouseOver={()=>expand(card.id)}/>
						<div>
							<div id={`${card.id}description`} className="description">
								<p>Name: {card.name}</p>
								<p>Favourites: {card.favourite}</p>
							</div>
							<div id={`${card.id}commands`} className="commands">
								<div id="F" title="Flag an error with the page" onClick={()=>flag(card.id)} onMouseOver={light} onMouseLeave={resetLight}>FLAG ERROR</div>
								<div id="X" title="Delete this page" onClick={()=>setPageId(card.id)} onMouseOver={light} onMouseLeave={resetLight}>DELETE</div>
							</div>
						</div>
					</div>
					)
				})
			}
			</div>
			</React.Fragment>
		 : "There are no pages added with your profile."}
		 {
		pageId.length?
			<div id="fullpage">
				<div id="popup">
					<h3>Do you really want to delete this page?</h3>
					<h6>Changed your mind? Just press SPACE</h6>
					<input type="text" placeholder="Write DELETE and press enter" onKeyPress={(event)=>delPage(event,pageId,setPageId,setDB)}/>
				</div>
			</div>
			: ""
		}
		 </React.Fragment>
		)
}
export default UserPanel;