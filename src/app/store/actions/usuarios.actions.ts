import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/api-response.interface';



export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSucces = createAction('[Users] Load Users Success',
props<{users:User[]}>()
);
export const loadUsersError = createAction('[Users] Load Users Error',
props<{payload:any}>()
);
