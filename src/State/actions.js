import {SET_PAGES_SUCCESS, SET_PAGES_FAILED,
SET_USERS_SUCCESS, SET_USERS_FAILED, SET_VISITS_SUCCESS,
SET_VISITS_FAILED, LOGIN_STATUS_SUCCESS, LOGIN_STATUS_FAILED,
ADD_NEW_PAGE_SUCCESS, ADD_NEW_PAGE_FAILED, WINDOW_RESIZE,
UPDATE_FAVOURITES_SUCCESS, UPDATE_FAVOURITES_FAILED,
REMOVE_PAGE_SUCCESS, REMOVE_PAGE_FAILED} from './constants';

import Pages from '../classes/pages';
import Users from '../classes/users';
import Visits from '../classes/visits';
const pages = new Pages();
const users = new Users();
const visits = new Visits();

export const handlePages=async()=>{
	try{
		await pages.all();
		const allPages = pages.getAll();
		// const allPages = [
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},
		// 	{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"},

		// ];

		return{
			type: SET_PAGES_SUCCESS, payload: allPages
		}
	}
	catch(e){
		return{
			type: SET_PAGES_FAILED, payload: [] 
		}
	}
}
export const handleUsers=async()=>{
	try{
		await users.all();
		const allUsers = users.getAll();
		return{
			type: SET_USERS_SUCCESS, payload: allUsers
		}
	}
	catch(e){
		return{
			type: SET_USERS_FAILED, payload: []
		}
	}
}
export const handleVisits=async()=>{
	try{
		await visits.all();
		const allVisits = visits.getAll();
		// const allVisits = [{"date":"3/21/2020","count":4},{"date":"3/31/2020","count":7},{"date":"4/1/2020","count":14}]
		return{
			type: SET_VISITS_SUCCESS, payload: allVisits
		}
	}
	catch(e){
		return{
			type: SET_VISITS_FAILED, payload:[]
		}
	}
}


export const updateLoginStatus = (user)=>{
	if(user)
		return{
			type: LOGIN_STATUS_SUCCESS, payload: user
		}
	return{
		type: LOGIN_STATUS_FAILED, payload: null
	}
}

export const addNewPage = async(pageInfo) => {
	try{
		await pages.create(pageInfo);
		return {
			type: ADD_NEW_PAGE_SUCCESS, payload: true
		}
	}
	catch(e){
		return{
			type: ADD_NEW_PAGE_FAILED, payload: false
		}
	}
}

export const deletePage = async(id) => {
	try{
		await pages.delete(id);
		return {
			type: REMOVE_PAGE_SUCCESS, payload: true
		}
	}
	catch(e){
		return{
			type: REMOVE_PAGE_FAILED, payload: false
		}
	}
}

export const windowResize = (windowSize) => ({type: WINDOW_RESIZE, payload: windowSize})

export const updateFavourites=async(user,page)=>{
	try{
		await users.updateFavourites(user.info,user.pageId);
		await pages.updateFavourites(page.id,page.count,page.direction);
		return {
			type: UPDATE_FAVOURITES_SUCCESS, payload: true
		}
	}
	catch(e){
		return {
			type: UPDATE_FAVOURITES_FAILED, payload: false
		}
	}
}

export const newVisit = async()=>{
	try{
		await visits.recordVisit();
		return { type: ""}
	}
	catch(e){
		return null
	}
}