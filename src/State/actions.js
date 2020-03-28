import {SET_PAGES_SUCCESS, SET_PAGES_FAILED,
SET_USERS_SUCCESS, SET_USERS_FAILED, SET_VISITS_SUCCESS,
SET_VISITS_FAILED, LOGGED_USER_SUCCESS, LOGGED_USER_FAILED,
ADD_NEW_PAGE_SUCCESS, ADD_NEW_PAGE_FAILED, WINDOW_RESIZE,
UPDATE_FAVOURITES_SUCCESS, UPDATE_FAVOURITES_FAILED,
LOGOUT_SUCCESS, LOGOUT_FAILED, REMOVE_PAGE_SUCCESS, REMOVE_PAGE_FAILED} from './constants';

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
		// const allPages = [{id:"vespucciakabaudo",name:"Amerigo Vespucci: il Pippo Baudo della nautica",type:"Arcade",category:"ignoranza",likes:1561,favourites:0,createdby:"1723130954465225",country:"Italy",url:"https://facebook.com/vespucciakabaudo",picture:"https://graph.facebook.com/vespucciakabaudo/picture?type=large"}];

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

export const login=async()=>{
	try{
		const user = await users.login();
		return{
			type: LOGGED_USER_SUCCESS, payload: user
		}
	}
	catch(e){
		return{type: LOGGED_USER_FAILED, payload: null}
	}
}

export const logout = async()=>{
	try{
		const user = user.logout();
		return{
			type: LOGOUT_SUCCESS, payload:user
		}
	}
	catch(e){
		return{type: LOGOUT_FAILED, payload: null}
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

export const updateFavourites=async(id,user,direction)=>{
	try{
		await pages.updateFavourites(id,direction);
		await users.updateFavourites(user,id);
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
