import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {PageEvent, MatPaginator} from '@angular/material/paginator';

export interface Task {
  id: number;
  user: any;
  date: Date;
  description: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'user', 'actions'];
  dataSource = new MatTableDataSource();

  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { 

  }

  ngOnInit() {
    this.search();
  }

  search(page: number = 0) {
    this.userService.get(page, this.pageSize)
    .subscribe((page: any) => {
      this.dataSource = new MatTableDataSource(page.content);
      this.totalElements = page.totalElements;
      this.pageNumber = page.number;
    });
  }

  changePage(event) {
    this.search(event.pageIndex);
    return event;
  }

  edit(task) {
    this.router.navigate(['users/form'])
    .then(() => {
      this.userService.edit.emit(task);
    });
  }

  remove(task) {
    this.userService.delete(task.id)
    .subscribe(() => {
      this.search();
    });
  }

}
