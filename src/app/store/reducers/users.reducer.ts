import { createReducer, on } from '@ngrx/store';
import {loadUsers,loadUsersSucces,loadUsersError} from '../actions';
import { User } from 'src/app/interfaces/api-response.interface';

export interface UsersState {
    users: User[]; 
    loaded: boolean;
    loading: boolean;
    error:any;
}

export const usersInitialState: UsersState = {
    users: [],
    loaded:false,
    loading:false,
    error:null
}

export const usersReducer = createReducer(usersInitialState,

    on(loadUsers, state => ({ ...state, loading: true})),
    on(loadUsersSucces, (state,{users}) => ({
         ...state,
         users: [ ...users ],
        loading: false,
        loaded: true,
        })),
    on(loadUsersError, (state,{payload}) => ({
         ...state,
        error:{
            url: payload.url,
            name: payload.name,
            message: payload.message
        },
        loading: false,
        loaded: false,
        })),


);

