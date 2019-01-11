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

				
			<div className="wrapper d-flex flex-column mt-1 ml-2 mr-0 rounded pop" title={category+", "+country}>
				<div className="background1">
					<div className='top d-flex '>
					<p className=" mr-1 w-100 word-wrap p-1"><a href={url} className="no-deco" target='_blank' rel="noopener noreferrer">{name}</a></p>
					</div>
				</div>
				<div className="photo">
						<img alt=""  src={picture} height="100%" width="auto" className=" flex m-auto" />
				</div>
				<div className="likes d-inline-flex justify-content-end p-0">
				 {
				 	this.props.user?(
						<div id={id} className=" d-inline-flex justify-content-center align-content-center p-0 h-100 pr-2" >
							{
								this.props.user.fav.includes(id)?
									<p id="star" className='star pointer fav' onClick={this.toggleFavourite}>&#9733;</p>:
									<p id="star" className='star pointer' onClick={this.toggleFavourite}>&#9733;</p>
							}
							<p className="star ">{this.props.favourites}</p></div>
				 		)
				 	:
						<div id={id} className="d-inline-flex justify-content-center pr-2"><p id="star" className='star mt-0 pt-0'>&#9733;</p><p className="star">{favourites}</p></div>	
				 }
				 
				</div>
			</div>
			)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);