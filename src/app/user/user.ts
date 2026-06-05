import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { User as UserModel } from '../../models/user.class';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit, OnDestroy {

  user: UserModel = new UserModel();
  allUsers: any[] = [];
  unsubUsers: any;
  private cdr = inject(ChangeDetectorRef);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.unsubUsers = onSnapshot(collection(db, 'users'), (list) => {
      const users: any[] = [];
      list.forEach((element) => {
        users.push({ id: element.id, ...element.data() });
      });
      this.allUsers = users;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.unsubUsers) {
      this.unsubUsers();
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUser);
  }
}
