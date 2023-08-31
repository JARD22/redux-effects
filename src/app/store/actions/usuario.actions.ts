import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/api-response.interface';



export const loadUser = createAction('[User] Load User',
    props<{id:string}>()
);
export const loadUserSuccess = createAction('[User] Load User Success',
props<{user:User}>()
);
export const loadUserError = createAction('[User] Load User Error',
props<{payload:any}>()
);
