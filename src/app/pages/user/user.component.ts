import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModifyComponent } from './components/user-modify/user-modify.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  loading: boolean = false;
  reload: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  showAddUSer() {
    const dialogRef = this.dialog.open(UserModifyComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.reload = result;
    });
  }
}
