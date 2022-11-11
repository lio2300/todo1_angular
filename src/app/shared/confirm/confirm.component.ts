import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/class/user.class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'todo1-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User; title: string; body: string }
  ) {}

  ngOnInit(): void {}
}
