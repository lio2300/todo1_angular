import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';
import { UserService } from 'src/app/services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserModifyComponent } from '../user-modify/user-modify.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
  selector: 'table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent implements OnInit {
  @Output() loadingUser: EventEmitter<any> = new EventEmitter<boolean>(false);
  @Input() set reload(reload: boolean) {
    reload && this.getUSers();
  }

  displayedColumns: string[] = [
    'user_name',
    'user_firstname',
    'user_lastname',
    'user_email',
    'user_phone',
    'user_dni',
    'user_age',
    'user_createdAt',
    'user_status',
    'actions',
  ];
  dataSource: User[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 10;
  pageSkip: number = 0;
  pageSearch: string = '';
  pageTotal: number = 0;

  formSearch: FormGroup;

  constructor(
    private _UserService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.formSearch = this.formBuilder.group({
      search: new FormControl('', [Validators.required]),
    });

    this.formSearch
      .get('search')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value) => {
        this.pageSearch = value;
        this.getUSers();
      });
  }

  ngOnInit(): void {
    this.getUSers();
  }

  getUSers() {
    this.loadingUser.emit(true);
    this._UserService
      .getUSers({
        skip: this.pageSkip,
        limit: this.pageSize,
        search: this.pageSearch,
      })
      .subscribe(
        (dataTable) => {
          const { data: users, total } = dataTable;
          this.pageTotal = total;
          this.dataSource = users;
          this.loadingUser.emit(false);
        },
        () => {
          this.loadingUser.emit(false);
        }
      );
  }
  changePage(page: any): void {
    const { pageSize, pageIndex } = page;
    this.pageSize = pageSize;
    this.pageSkip = pageIndex;
    this.getUSers();
  }

  showEditUSer(user: User) {
    const dialogRef = this.dialog.open(UserModifyComponent, {
      width: '600px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reload = result;
    });
  }

  deleteUser(user: User) {
    const title = `Desea eliminar este registro?`;
    const body = `Al eliminar este registro no se podrá recuperar esta información.`;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { user, title, body },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result &&
        this._UserService.deleteUser(user).subscribe((resp) => {
          this.reload = result;
        });
    });
  }
}
