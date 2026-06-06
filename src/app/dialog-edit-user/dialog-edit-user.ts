import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, FormsModule, MatProgressBarModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.html',
  styleUrl: './dialog-edit-user.scss',
})
export class DialogEditUser implements OnInit {
  user: User = new User();
  userId: string = '';
  birthDate!: Date;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUser>) {}

  ngOnInit() {
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }

  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    this.loading = true;
    try {
      const userRef = doc(db, 'users', this.userId);
      await updateDoc(userRef, this.user.toJSON());
      setTimeout(() => this.dialogRef.close());
    } catch (e) {
      console.error('Error updating document: ', e);
    } finally {
      this.loading = false;
    }
  }
}
