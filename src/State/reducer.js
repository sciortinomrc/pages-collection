import {REQUEST_PAGE_SUCCESS, SET_DATABASE,
		REQUEST_PAGE_FAILED, 
		WINDOW_RESIZE, CHANGE_PAGE, CATEGORY_CHOICE,PAGE_ADDED,
		ADD_PAGE_FAILED, ADD_PAGE_SUCCESS, DISPLAY_CARD,
		SET_SEARCH_FIELD, SET_COUNTRY_FILTER, SET_CATEGORY_FILTER,
		FILTERS, LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_FAILED,
		LOGOUT, REGISTER, REGISTER_FAILED,  UPDATE_FAVOURITES, UPDATE_USERS_FAVOURITES
	} from './constants';

//api call reducer
	const initialCardsState={
		cards: [],
		message: ''
	}
	export const fbApiCall=(state=initialCardsState, action={})=>{
		switch(action.type){
			case REQUEST_PAGE_SUCCESS:
				return {
					 	 cards: action.payload,
						 message: PAGE_ADDED,
						} 
			case REQUEST_PAGE_FAILED:
				return { 
						...state,
						message: action.payload
						}
			default: return state;
		}
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
//change page
	const initialPageState={
		open: 'home',
		chosen_category: ''
	}
	export const onPageChange=(state=initialPageState, action={})=>{
		switch(action.type){
			case CHANGE_PAGE: return { ...state, open: action.payload};
			case CATEGORY_CHOICE: return { open: action.payload.page, chosen_category: action.payload.chosen_category};
			default: return state;
		}
	}
//add new page

	const initialDBState={
		database: [],
     	message:''
	}
	export const addNewPage=(state=initialDBState, action={})=>{
		switch(action.type){
			case SET_DATABASE:{
				return {...state, database: action.payload}
			}
			case ADD_PAGE_FAILED:
				return {...state, message:action.payload}
			case ADD_PAGE_SUCCESS:
				return { database:action.payload.db, message:action.payload.message}
			case UPDATE_FAVOURITES:{
				return{
					message: '',
					database: action.payload
					}
				}
			default: return state
		}
	}

//single card display from search
	const initialCardDisplayState={
		card:{}
	}
	export const displaySingleCard=(state=initialCardDisplayState, action={})=>{
		switch(action.type){
			case DISPLAY_CARD:
				return { card: action.payload}
			default: return state
		}

	}
//filter searchField
const initialFilterState={
	searchField: '',
	categoryFilter: '',
	countryFilter: '',
	filters: {categoryFilters:[], countryFilters:[]}
}
export const addFilter=(state=initialFilterState, action={})=>{
	switch(action.type){
		case SET_SEARCH_FIELD:{
			return {...state, searchField: action.payload}
		}
		case SET_COUNTRY_FILTER:{
			return {...state, countryFilter: action.payload}
		}
		case SET_CATEGORY_FILTER:{
			return {...state, categoryFilter: action.payload}
		}
		case FILTERS:{
			return{...state, filters: {categoryFilters:action.payload.categoryFilters, countryFilters: action.payload.countryFilters}}
		}
		default: return state
	}
}
//login attempt
	const initialLoginState={
		isLoginPending: false,
		loginMessage: '',
		loggedUser: undefined
	}

	export const onLogin=(state=initialLoginState, action={})=>{
		switch(action.type){
			case LOGIN_PENDING: return{
				...state,
				isLoginPending: true,
				loginMessage: '',
			}
			case LOGIN_SUCCESS: return{
				isLoginPending: false,
				loginMessage: 'Access Granted',
				loggedUser: action.payload
			}
			case LOGIN_FAILED: return{
				loggedUser:undefined,
				isLoginPending:false,
				loginMessage: action.payload
			}
			case LOGOUT: return{
				isLoginPending: false,
				loginMessage: action.payload,
				loggedUser: undefined
			}
			case UPDATE_USERS_FAVOURITES: return{
				isLoginPending: false,
				loginMessage: 'Updated favourites',
				loggedUser: action.payload
			}
			default: return state
		}
	}
//signup new account
	const initialSignupState={
		message: ''
	}
	export const signUp=(state=initialSignupState, action={})=>{
		switch(action.type){
			case REGISTER:
				return{
					message: action.payload
				}
			case REGISTER_FAILED:
				return{
					message: action.payload
				}
			default: return state
		}
	}
 