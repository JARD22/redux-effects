import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects{
    constructor(
        private actions$ : Actions,
        private userService : UserService
    ){}

    loadUser$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(loadUser),
            mergeMap(
                (action)=> this.userService.getUserById(action.id).pipe(
                    map( resp => loadUserSuccess({user:resp.data})),
                    catchError(error => of (loadUserError({payload: error})))
                )
            )
        )
    );
}