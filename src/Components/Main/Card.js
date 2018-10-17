import React, {Component} from 'react';
import './Style/Card.css';
import {connect} from 'react-redux';

const mapStateToProps=state=>({
	logged: state.onLogin.logged
})
const mapDispatchToProps=dispatch=>{

}

class Card extends Component{
	constructor(...props){
		super(...props)
	}
	favpiuuno=()=>{
		const star=document.getElementById(this.props.id);
		console.log(star.children[0].classList)
	}
	render(){
		const {id,category,name,link,picture,fan_count,favourites,country} =this.props;
		return(

				
			<div className="wrapper d-flex flex-column mt-1 ml-2 mr-3 rounded" title={category+", "+country}>
				<div className="background1">
					<div className='top d-flex '>
					<p className=" mr-1 w-100 word-wrap p-1"><a href={link} className="no-deco" target='_blank'>{name}</a></p>
					</div>
				</div>
				<div className="photo">
						<img alt=""  src={picture} height="100%" width="auto" className=" flex m-auto" />
				</div>
				<div className="likes d-inline-flex justify-content-end">
				 <div className="mr-2"><img alt="" src="https://www.freistellen.de/wp-content/uploads/2017/03/Fotolia_142201188_S.jpg" width="30px" height="auto" />{fan_count}</div>
				 {
				 	this.props.logged?
						<div id={id} className="mr-2 ml-2 d-inline-flex" onClick={this.favpiuuno}><p id="star-five" className="light"></p><p className="fav">{this.props.favourites}</p></div>
				 	:
						<div id={id} className="mr-2 ml-2 d-inline-flex"><p id="star-five"></p><p className="fav">{this.props.favourites}</p></div>	
				 }
				 
				</div>
			</div>
			)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);