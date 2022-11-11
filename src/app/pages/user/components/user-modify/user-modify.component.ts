import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User as userClass } from 'src/app/class/user.class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.scss'],
})
export class UserModifyComponent implements OnInit {
  formUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | undefined,
    private formBuilder: FormBuilder,
    private _UserService: UserService
  ) {
    let user: User = new userClass(this.data);
    this.formUser = this.formBuilder.group({
      pk_user: new FormControl(user.pk_user, Validators.required),
      user_name: new FormControl(user.user_name, Validators.required),
      user_firstname: new FormControl(user.user_firstname, Validators.required),
      user_lastname: new FormControl(user.user_lastname, Validators.required),
      user_email: new FormControl(user.user_email, Validators.required),
      user_phone: new FormControl(user.user_phone, Validators.required),
      user_dni: new FormControl(user.user_dni, Validators.required),
      user_age: new FormControl(user.user_age, Validators.required),
      user_createdAt: new FormControl(user.user_createdAt, Validators.required),
      user_status: new FormControl(user.user_status, Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmitUser() {
    if (this.formUser.valid) {
      const user = this.formUser.getRawValue();
      !this.data &&
        this._UserService.registerUser(user).subscribe((resp) => {
          this.dialogRef.close(true);
        });
      this.data &&
        this._UserService.updateUser(user).subscribe((resp) => {
          this.dialogRef.close(true);
        });
    }
  }
}
