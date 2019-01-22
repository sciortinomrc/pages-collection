import React, {Component} from 'react';
import './Style/Card.css';
import {connect} from 'react-redux';
import {updateFavourites} from '../../State/actions';

const mapStateToProps=state=>({
	user: state.onLogin.loggedUser
})
const mapDispatchToProps=dispatch=>{
	return {
		updateFavourites: (id,user)=> dispatch(updateFavourites(id,user))
	}
}

class Card extends Component{
	toggleFavourite=(event)=>{
		const click=event.target;
		if(click.classList.contains('fav')) click.classList.remove('fav')
		else click.classList.add('fav')
		this.props.updateFavourites(this.props.id,this.props.user.id)
	}

	render(){
		const {id,category,name,url,picture,favourites,country} =this.props;
		return(

				
			<div id="card" title={category.toUpperCase()+", "+country.toUpperCase()}>
				<div id="img-wrapper" >
					<img alt=""  src={picture} height="100%" width="auto" />
					<p > </p>
				</div>
				<div >
					<p ><a href={url} target='_blank' rel="noopener noreferrer">{name}</a></p>
				</div>
				<div id="favs" >
				 {
				 	this.props.user?(
						<React.Fragment>
							{
								this.props.user.fav.includes(id)?
									<p id="star" onClick={this.toggleFavourite} style={{color: 'yellow'}}>&#9733;</p>:
									<p id="star" onClick={this.toggleFavourite}>&#9733;</p>
							}
							<p>{this.props.favourites}</p>
						</React.Fragment>
				 		)
				 	:
						<React.Fragment><p id="star" >&#9733;</p><p >{favourites}</p></React.Fragment>
				 }
				 
				</div>
			</div>
			)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);