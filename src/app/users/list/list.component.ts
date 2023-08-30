import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/api-response.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit, OnDestroy {

  private destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  userList: User[]=[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(takeUntil(this.destroy))
    .subscribe({
      next:({data})=>{
        this.userList=data;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
