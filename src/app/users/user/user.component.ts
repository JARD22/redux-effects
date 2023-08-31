import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/api-response.interface';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  private destroyed$ : ReplaySubject<boolean> = new ReplaySubject(1);
   user!: User | null;

  constructor(private router: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    
    this.router.params.subscribe(({id})=>{
      this.store.dispatch(loadUser({id}));
    });
    this.store.select('user')
    .pipe(takeUntil(this.destroyed$),
          filter(data=>data.user != null))
    .subscribe({
      next:(data)=>{
        this.user = data.user;
        // console.log(data);
        
      }
    });
  }

  ngOndestroy(){
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
