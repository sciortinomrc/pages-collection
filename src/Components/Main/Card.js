import React from 'react';
import './Style/Card.css';
const Card=({name,fan_count,picture,link,favourites,category})=>{
	console.log(category)
	return(

			
		<div className="wrapper d-flex flex-column mt-1 ml-2 mr-3 rounded" data-toggle="tooltip" data-placement="top" title={category}>
			<div className="background1">
				<div className='top d-flex '>
				<p className=" mr-1 w-100 word-wrap p-1"><a href={link} className="no-deco" target='_blank'>{name}</a></p>
				</div>
			</div>
			<div className="photo">
					<img alt=""  src={picture} height="100%" width="auto" className=" flex m-auto" />
			</div>
			<div className="likes">
			 <span className="mr-2"><img alt="" src="https://www.freistellen.de/wp-content/uploads/2017/03/Fotolia_142201188_S.jpg" width="30px" height="auto" />{fan_count}</span>
			 <span className="mr-2 ml-2"><img alt="" src="https://cdn1.iconfinder.com/data/icons/utilities-part-1/64/bookmark_1-512.png" width="25px" height="auto" /> {favourites} </span>
			</div>
		</div>
		)
}

export default Card;