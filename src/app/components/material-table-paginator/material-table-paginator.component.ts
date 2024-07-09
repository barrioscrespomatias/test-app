import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-material-table-paginator',
  templateUrl: './material-table-paginator.component.html',
  styleUrls: ['./material-table-paginator.component.css']
})
export class MaterialTablePaginatorComponent<T> implements AfterViewInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() data: T[] = [];

  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }
}