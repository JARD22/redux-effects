import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/api-response.interface';
import { UserService } from 'src/app/services/user.service';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit, OnDestroy {

  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  userList: User[]=[];
  loading: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('users').pipe(takeUntil(this.destroy$))
    .subscribe({
      next:({users,loading})=>{
        this.userList = users;
        this.loading = loading;
      }
    })
    this.store.dispatch(loadUsers());

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
