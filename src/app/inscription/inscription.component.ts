import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { User } from "../modules/User";
import { UserService } from '../user.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(private userService: UserService,
    private router: Router) { }


  user!: User;

  getUser(form: NgForm) {
  
    this.register(form);

  }

  register(form: NgForm){
    this.successNotification(form)
   
      // return new User(form.value['username'], form.value['password'],
      //   form.value['prenom'], form.value['nom'], form.value['email'])
  


  }

  successNotification(form: NgForm){
    Swal.fire({
      title: 'Do you want to submit your inscription?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: 'Cancel',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Inscription Completed!', '', 'success')
        this.userService.users.push(new User(form.value['username'], form.value['password'],
        form.value['name'], form.value['email']));
        console.log(this.userService.users);
        this.router.navigateByUrl("/");
      } else if (result.isDenied) {
      }
    })
  }
}