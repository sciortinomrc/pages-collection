import React from "react";
import {useState} from "react";
import { connect } from 'react-redux';
import './UserPanel.css';
import { deletePage, handlePages } from '../../State/actions'

mapDispatchToProps=dispatch=>({
	delete: async(id)=>{
		dispatch(await deletePage(id));
		dispatch(await handlePages());
	}

})
mapStateToProps=state=>({
	user: state.login.user
})

const expand=(id, activeListener, setListenerState)=>{
	if(!activeListener){
		setListenerState(true);
		const pic=document.getElementById(id+"picture");
		const picDescription=document.getElementById(id+"description");
		pic.style.transform="scale(1.2)";
		pic.style.border="3px solid #4267b2"
		pic.parentNode.style.gridColumn="1/span-1";
		pic.parentNode.style.order="-1";
		picDescription.style.width="600px";
		picDescription.style.paddingLeft="50px";
			setTimeout(()=>{
				pic.parentNode.addEventListener("mouseleave",()=>{
					const com=document.getElementById(id+"commands");
					com.style.display="";
					pic.style.transform="";
					pic.style.border="";
					setTimeout(()=>{
						pic.parentNode.style.gridColumn="";
						pic.parentNode.style.order="";
					},1000)
					picDescription.style.width="";
					picDescription.style.paddingLeft="";
					pic.parentNode.removeEventListener("mouseleave",()=>{});
					setListenerState(false);
				})
			},1000)
	}
}
const showCommands=(event,id)=>{
	const com=document.getElementById(id+"commands");
	if(event.target.id!=="F" && event.target.id!=="X"){
		com.style.display.length?
			com.style.display="" :
			com.style.display="grid"
	}
}

const delPage=(event,pageId,setPageId)=>{
	const popup=document.getElementById("fullpage");
	if(event.key==="Enter" && event.target.value==="DELETE"){
		this.props.delete(pageId);
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
	const {pages,name} = props;
	const [pageId, setPageId] = useState("");
	const [activeListener, setListenerState] = useState(false)
	const db=pages.filter(card=>card.createdby===props.user.id)
	const userPictureURL=`https://graph.facebook.com/${props.user.id}/picture?type=large`
	return(
		<React.Fragment>
		<h2>
		<img id="user-pic" src={userPictureURL} alt=""/>
		{name}</h2>
		{(db.length)?
			<React.Fragment>
			Here's the list of all your pages.
			<hr />
			<div id="list">
			{
				db.map(card=>{
					return(	
					<div key={card.id} id={card.id} className="profileSmallCard" onClick={(e)=>{showCommands(e,card.id)}} >
						<img id={`${card.id}picture`} className="picture" src={card.picture} alt="" onMouseOver={()=>expand(card.id,activeListener, setListenerState)}/>
						<div>
							<div id={`${card.id}description`} className="description">
								<p>Name: {card.name}</p>
								<p>Favourites: {card.favourite}</p>
							</div>
							<div id={`${card.id}commands`} className="commands">
								<div id="X" title="Delete this page" onClick={()=>{
									setPageId(card.id)
									document.addEventListener("keydown",(e)=>{
										if(e.key==="Escape") setPageId("");
										document.removeEventListener("keydown",()=>{});
										})
									}
								}
								onMouseOver={light} onMouseLeave={resetLight}>DELETE</div>
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
					<h6>Changed your mind? Just press ESC</h6>
					<input type="text" placeholder="Write DELETE and press enter" onKeyPress={(event)=>delPage(event,pageId,setPageId)}/>
				</div>
			</div>
			: ""
		}
		 </React.Fragment>
		)
}
export default connect(mapDispatchToProps, mapStateToProps)(UserPanel);