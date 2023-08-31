import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { loadUsers, loadUsersError, loadUsersSucces } from '../actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UsersEffects{
    constructor(
        private actions$ : Actions,
        private userService : UserService
    ){}

    loadUser$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(loadUsers),
            mergeMap(
                ()=> this.userService.getUsers().pipe(
                    map( resp => loadUsersSucces({users:resp.data})),
                    catchError(error => of (loadUsersError({payload: error})))
                )
            )
        )
    );
}