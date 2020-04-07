import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from '../activity.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  users = []

  form: FormGroup;

  editSubscription: Subscription;

  customPatterns = { '0': { pattern: new RegExp('\[0-2\]')} };

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      id: [],
      user: [null, Validators.required],
      date: [{ value: new Date(), disabled: true}, Validators.required],
      description: [null, Validators.required],
      initialTime: ['08:00', Validators.required],
      lunchTime: ['12:00', Validators.required],
      lunchReturn: ['14:00', Validators.required],
      finalPeriod: ['18:00', Validators.required]
    });

    this.userService.get().subscribe((users: any) => {
      this.users = users;
    });

    this.editSubscription = this.activityService.edit.subscribe((task: any) => {
      task.date = new Date(task.date);
      this.form.patchValue(task);
    });
  }

  ngOnInit() {
    
  }

  save() {
    if(!this.form.valid) {
      alert('Preencha todos os campos.');
      return;
    }

    const task = this.form.getRawValue();
    task.date = dayjs(task.date).format("YYYY-MM-DDTHH:MM:ss");

    this.activityService.post(task).subscribe((task) => { 
      this.clear(); 
      this.router.navigate(['../tasks']);
    });
  }

  clear() {
    this.form.reset({
      date: new Date(),
      initialTime: "08:00",
      lunchTime: "12:00",
      lunchReturn: "14:00",
      finalPeriod: "18:00"
    });
  }

  compareCategoryObjects(task1: any, task2: any) {
    return task1 && task2 && task1.id == task2.id;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
