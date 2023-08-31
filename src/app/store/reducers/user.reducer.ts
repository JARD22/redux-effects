import { createReducer, on } from '@ngrx/store';
import {loadUser,loadUserSuccess,loadUserError} from '../actions';
import { User } from 'src/app/interfaces/api-response.interface';

export interface UserState {
    id: string ,
    user: User | null; 
    loaded: boolean;
    loading: boolean;
    error:any;
}

export const userInitialState: UserState = {
    id: '',
    user:null,
    loaded:false,
    loading:false,
    error:null
}

export const userReducer = createReducer(userInitialState,

    on(loadUser, (state, {id}) => ({ 
        ...state, 
        loading: true,
        id:id
    })),
    on(loadUserSuccess, (state,{user}) => ({
         ...state,
         user: user ,
        loading: false,
        loaded: true,
        })),
    on(loadUserError, (state,{payload}) => ({
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

