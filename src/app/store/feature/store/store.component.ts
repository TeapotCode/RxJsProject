import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {Observable, tap} from "rxjs";
import {User} from "../../utils/user.interface";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  users$: Observable<User[]> = this.api.getUsers()

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.api.login("donero", "ewedon").subscribe()
  }
}
