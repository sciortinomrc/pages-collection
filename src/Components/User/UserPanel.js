import React from "react";
import {useState} from "react";
import { connect } from 'react-redux';
import './UserPanel.css';
import { deletePage, handlePages } from '../../State/actions'

const mapDispatchToProps=dispatch=>({
	delete: async(id)=>{
		dispatch(await deletePage(id));
		dispatch(await handlePages());
	}

})
const mapStateToProps=state=>{
	return{
		user: state.loginStatus.user
	}
}
const SmallCard=(props)=>{
	const {card, selectCard} = props;
	return(
		<div key={"cardkey-"+card.id} id={"card-"+card.id} className="profileSmallCard position-relative" onClick={()=>{selectCard(card)}}>
			<img id={`picture-${card.id}`} className="picture" src={`https://graph.facebook.com/${card.id}/picture?type=large`} alt=""/>
			<div className="details">{card.name}</div>
		</div>
	)
}


const deleteListener = (select)=>{
	setTimeout(()=>{
		document.body.addEventListener("click", (e)=>{
			console.log(e.target.dataset.scope)
			if(e.target.dataset.scope==="overlay") return;
			if(e.target.dataset.scope!=="delete" ) {
				select(null);
			}
		})
	},1000)
}

const BigCard = (props)=>{
	deleteListener(props.select);
	const {card} = props;
	return(
		<div id={"selected"+card.id} data-scope="delete" className="d-flex profileSmallCard selected position-relative">
			<img id={`selected-pic-${card.id}`} className="picture" data-scope="delete" src={`https://graph.facebook.com/${card.id}/picture?type=large`} alt=""/>
			<div data-scope="delete" className="details"><strong style={{width:"50%"}}>{card.name}</strong> {card.type} <br/> {card.category} <br /> {card.country} <br /> favourites: {card.favourites} <br/> likes: {card.likes}</div>
			<div data-scope="delete" className="delete ml-5" onClick={()=>{props.delete(true)}}>Delete</div>
		</div>
	)
}

const delPage =(e, id, fn)=>{
	if(e.key==="Enter" && deleteInputRef.value==="DELETE"){
		fn.delete(id)
	}
	if(e.key==="Escape" || (e.key==="Enter" && deleteInputRef.value==="DELETE")){
		fn.setCard(null);
		fn.setDeleting(false);
	}
}

let deleteInputRef;

const UserPanel=(props)=>{
	const {pages,name} = props;
	const [selectedCard, setCard] = useState(null);
	const [deleting, setDeleting] = useState(false);
	const db=pages.filter(card=>card.createdby===props.user.id)
	const userPictureURL=`https://graph.facebook.com/${props.user.id}/picture?type=large`;
	const del = props.delete;
	return(
		<React.Fragment>
		<div className="text-center">
			<h2>
			<img id="user-pic" src={userPictureURL} alt=""/>
			</h2>
			<p>{name}</p>
			<p>{!db.length?"You have not added any page yet...":""}</p>
		</div>
		{selectedCard?
		<React.Fragment>
			<hr />
			<BigCard card={selectedCard} delete={setDeleting} select={setCard}/>
		</React.Fragment>:
			""}

		<hr />
		<div id="list">
		{
			db.map((card,i)=>{
				return(	
					<SmallCard key={"smallKey"+i+card.id} card={card} selectCard={setCard} onDeleting={setDeleting} />
				)
			})
		}
		</div>
		{
		deleting?
			<div id="fullpage" data-scope="overlay" onKeyDown={(e)=>{delPage(e,selectedCard.id,{setCard, setDeleting, delete: del })}}>
				<div id="popup" data-scope="overlay" >
					<h3 data-scope="overlay" >Do you really want to delete this page?</h3>
					<h6 data-scope="overlay" >Changed your mind? Just press ESC</h6>
					<input type="text" data-scope="overlay"  placeholder="Write DELETE and press enter" ref={ref=>deleteInputRef=ref } />
				</div>
			</div>
			: ""
		}
		 </React.Fragment>
		)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPanel);