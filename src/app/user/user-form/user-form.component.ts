import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;

  editSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      id: [],
      nome: [null, Validators.required]
    });

    this.editSubscription = this.userService.edit.subscribe((user: any) => {
      this.form.patchValue(user);
    });
  }

  ngOnInit() {
    
  }

  save() {
    if(!this.form.valid) {
      alert('Preencha todos os campos.');
      return;
    }

    this.userService.post(this.form.getRawValue()).subscribe((user) => { 
      this.clear();
      this.router.navigate(['../users']);
    });
  }

  clear() {
    this.form.reset({date: new Date()});
  }

  compareCategoryObjects(user1: any, user2: any) {
    return user1 && user2 && user1.id == user2.id;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
