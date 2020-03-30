import {SET_PAGES_SUCCESS, SET_PAGES_FAILED,
SET_USERS_SUCCESS, SET_USERS_FAILED, SET_VISITS_SUCCESS,
SET_VISITS_FAILED, LOGGED_USER_SUCCESS, LOGGED_USER_FAILED,
ADD_NEW_PAGE_SUCCESS, ADD_NEW_PAGE_FAILED, WINDOW_RESIZE,
LOGOUT_SUCCESS, LOGOUT_FAILED } from './constants';


const pagesState = {
	pages: null
}

export const handlePages = (state=pagesState, action={})=> {
	if(action.type==SET_PAGES_SUCCESS)
		return {
			pages: action.payload
		}
	if(action.type==SET_PAGES_FAILED)
		return state;

	return state;
}

const usersState = {
	users: []
}
export const handleUsers = (state=usersState, action={})=>{
	if(action.type==SET_USERS_SUCCESS)
		return{
			users: action.payload
		}
	if(action.type==SET_USERS_FAILED)
		return state
	
	return state;
}

const visitsState = {
	visits: []
}
export const handleVisits = (state = visitsState, action={})=>{
	if(action.type==SET_VISITS_SUCCESS)
		return{
			visits: action.payload
		}
	if(action.type == SET_VISITS_FAILED)
		return state

	return state;

}

const loginState = {
	user: {}
}
export const login = (state=loginState, action={})=>{
	if(action.type==LOGGED_USER_SUCCESS)
		return{
			user: action.payload
		}
	if(action.type==LOGGED_USER_FAILED)
		return state

	return state;
}
export const logout = (state=loginState,action={})=>{
	if(action.type==LOGOUT_SUCCESS)
		return{
			user: {}
		}
	if(action.type==LOGOUT_FAILED)
		return state
	
	return state
}


//window resize
const initialWindowSize={
	size: [window.innerWidth,window.innerHeight]
}
export const onWindowResize=(state=initialWindowSize, action={})=>{
	switch(action.type){
		case WINDOW_RESIZE:
			return {
				size: action.payload
			};
		default: return state

	}
}
 
const addnewPageState = {
	added: false
}

export const addNewPage = (state=addnewPageState, action={})=>{
	if(action.type==ADD_NEW_PAGE_SUCCESS){
		return {
			added: true
		}
	}
	if(action.type==ADD_NEW_PAGE_FAILED){
		return{
			added: false
		}
	}
	return state
}