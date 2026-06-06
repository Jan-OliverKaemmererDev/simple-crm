import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddress } from '../dialog-edit-address/dialog-edit-address';
import { DialogEditUser } from '../dialog-edit-user/dialog-edit-user';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit, OnDestroy {
  userId: string = '';
  user: User = new User();
  unsubUser: any;
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') || '';
      if (this.userId) {
        this.getUser();
      }
    });
  }

  getUser() {
    this.unsubUser = onSnapshot(doc(db, 'users', this.userId), (userDoc) => {
      this.user = new User(userDoc.data());
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.unsubUser) {
      this.unsubUser();
    }
  }

  openAdressDialog(){
    const dialog = this.dialog.open(DialogEditAddress);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUser);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
