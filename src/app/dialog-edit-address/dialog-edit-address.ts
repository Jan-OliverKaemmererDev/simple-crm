import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatProgressBarModule],
  templateUrl: './dialog-edit-address.html',
  styleUrl: './dialog-edit-address.scss',
})
export class DialogEditAddress {
  user: User = new User();
  userId: string = '';
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddress>) {}

  async saveUser() {
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
