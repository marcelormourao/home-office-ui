import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from './activity.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {PageEvent, MatPaginator} from '@angular/material/paginator';
import { CSVUtils } from '../util/csv-util';
// import { DateUtil } from '../util/date-util';
import * as dayjs from 'dayjs';
import { UserService } from '../user.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface Task {
  id: number;
  user: any;
  date: Date;
  description: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  displayedColumns: string[] = ['id', 'user', 'date', 'description', 'actions'];
  dataSource = new MatTableDataSource();

  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  form: FormGroup;
  users = []

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      date: [{ value: new Date(), disabled: true}, Validators.required],
      user: []
    });

    this.userService.get().subscribe((users: any) => {
      this.users = [{id: null, nome: 'TODOS'}, ...users];
    });
  }

  ngOnInit() {
    this.search(0, new Date(this.form.getRawValue().date));
  }

  search(page: number = 0, date?: Date, user?: number) {
    this.activityService.get(page, this.pageSize, date, user)
    .subscribe((page: any) => {
      this.dataSource = new MatTableDataSource(page.content);
      this.totalElements = page.totalElements;
      this.pageNumber = page.number;
    });
  }

  dateChange(event) {
    const formValue = this.form.getRawValue();

    const user:number = formValue.user ? formValue.user.id : null;

    this.search(0, event.value, user);
  }

  userChange(event) {
    this.search(0, new Date(this.form.getRawValue().date), event.value.id);
  }

  changePage(event) {
    this.search(event.pageIndex, new Date(this.form.getRawValue().date));
    return event;
  }

  edit(task) {
    this.router.navigate(['tasks/form'])
    .then(() => {
      this.activityService.edit.emit(task);
    });
  }

  remove(task) {
    var result = confirm("Tem certeza que deseja remover a atividade?");

    if(result) {
      this.activityService.delete(task.id)
      .subscribe(() => {
        this.search(0, new Date(this.form.getRawValue().date));
      });
    }
  }

  exportCSV() {
    var headers = {
      id: 'Id',
      user: "Usuário",
      data: "Data",
      description: "Descrição",
      initialTime: "Batida inicial",
      lunchTime: "Saída almoço",
      lunchReturn: "Retorno Almoço",
      finalPeriod: "Batida final"
    };

    const formValue = this.form.getRawValue();

    const date = formValue.date;
    const user = formValue.user ? formValue.user.id : null;
    this.activityService.get(0, 1000, date, user)
    .subscribe((page: any) => {
      const tasks = page.content;
  
      var itemsFormatted = [];
  
      // const dateUtil = new DateUtil();
      debugger
      // format the data
      tasks.forEach((item: any) => {
          itemsFormatted.push({
              id: item.id,
              "Usuário": item.user.nome,
              "Data": dayjs(item.date).format('DD/MM/YYYY'),
              "Descrição": item.description,
              "Batida inicial": item.initialTime,
              "Saída Almoço": item.lunchTime,
              "Retorno almoço": item.lunchReturn,
              "Batida final": item.finalPeriod
          });
      });
  
      var fileTitle = 'atividades';
  
      // new CSVUtils().exportCSVFile(headers, itemsFormatted, fileTitle);
      this.exportAsExcelFile(itemsFormatted, 'homeoffice');
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

}
