import {SET_LOGIN_STATE, REQUEST_PAGE_PENDING, REQUEST_PAGE_SUCCESS,
		REQUEST_PAGE_FAILED, GET_ACCESS_FAILED, GET_ACCESS_SUCCESS,
		WINDOW_RESIZE, CHANGE_PAGE, CATEGORY_CHOICE,
		ADD_PAGE_FAILED, ADD_PAGE_SUCCESS, ACCESS_TOKEN } from './constants';

//login reducer
	const initialLoginState={
		logged: false,
	}
	export const onLogin = (state=initialLoginState, action={}) =>{
		switch(action.type){
			case SET_LOGIN_STATE: 
				return { ...state, logged: action.payload};
			default: 
				return state;
		}
	}
//api call reducer
	const initialCardsState={
		isPending: false,
		cards: [],
		message: ''
	}
	export const fbApiCall=(state=initialCardsState, action={})=>{
		switch(action.type){
			case REQUEST_PAGE_PENDING:
				return { ...state, isPending: true};
			case REQUEST_PAGE_SUCCESS:{
				//tempCards.push(action.payload);
				return { isPending: false,
					 	 cards: [...state.cards, action.payload],
						 message: 'The page has been added to our Database',
						} 
			}
			case REQUEST_PAGE_FAILED:
				return { 
						...state,
						isPending: false,
						message: action.payload
						}
			default: return state;
		}
	}
//facebook Login
	const initialFBState={
		accessToken: ACCESS_TOKEN
	}

	export const fbLogin=(state=initialFBState, action={})=>{
		switch(action.type){
			case GET_ACCESS_SUCCESS:
				return {
					accessToken: action.payload
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
		database:[ 
        {id: '1868643320130834', category: 'natura', favourite: 0, country: 'Italy'},
        {id: '718361521697095', category: 'natura', favourite: 0, country: 'Italy'},
        {id: '1169644526470881', category: 'fantasia', favourite: 0, country: 'Italy'},
        {id: '137492556866190', category: 'trasformismo', favourite: 0, country: 'Italy'},
        {id: '1683822428328710', category: 'trasformismo', favourite: 0, country: 'Italy'},
        {id: '354760301630118', category: 'ignoranza', favourite: 0, country: 'Italy'},
      ],
      message:''
	}
	export const addNewPage=(state=initialDBState, action={})=>{
		switch(action.type){
			case ADD_PAGE_FAILED:
				return {...state, message:action.payload}
			case ADD_PAGE_SUCCESS:
				return { database:[...state.database, {id: action.payload.id, category: action.payload.category, country: action.payload.country}], message:action.payload.message}
			default: return state
		}
	}