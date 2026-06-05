import { Component } from '@angular/core';
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
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';

@Component({
  selector: 'app-dialog-add-user',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, FormsModule, MatProgressBarModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  user: User = new User();
  birthDate!: Date;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUser>) {}

  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    this.loading = true;
    try {
      const docRef = await addDoc(collection(db, "users"), this.user.toJSON());
      console.log("Document written with ID: ", docRef.id);
      setTimeout(() => this.dialogRef.close());
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      this.loading = false;
    }
  }
}
