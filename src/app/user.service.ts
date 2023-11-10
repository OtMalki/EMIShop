import { Injectable } from '@angular/core';
import { User } from './modules/User';
import { NgForm } from '@angular/forms';
import * as e from 'express';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router : Router) { }

  users : User[] = [new User('admin', 'admin', 'admin','admin')]

  access : boolean = false

  successNotification() {
    Swal.fire('Login Successful','', 'success');
  }

  errorNotification() {
    Swal.fire('Wrong password or username','', 'error');
  }

  check(form : NgForm){
    
    this.users.forEach(element => {
      if(element.username == form.value['username'] && element.password ==  form.value['password']){
        this.access = true;
        this.router.navigateByUrl("/");
        this.successNotification()
      } else {
        this.errorNotification();
      }
    });
  }
}
