import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksRequest, Categories } from 'src/app/model/model';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GlobalConstant } from '../../globalconstant';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  onAddBook = new EventEmitter();
  onEditBook = new EventEmitter();
  bookForm: any = FormGroup;
  categories: Categories[] = [];
  responseMessage: any;
  dialogAction: any = 'Add';
  action: any = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private categoryService: CategoryService,
    private bookService: BookService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BooksComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      author: [null, [Validators.required]],
    });

    this.getCategories();

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.bookForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.updateBook();
    } else {
      this.saveBook();
    }
  }

  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (res: Categories[]) => {
        this.categories = res;
      },
      error: (err: any) => {
        if (err.error) {
          this.responseMessage = err.error;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbar.openErrorSnackBar(
          this.responseMessage,
          GlobalConstant.error
        );
      },
    });
  }

  //add dialog

  saveBook() {
    const formData = this.bookForm.value;
    const data = {
      title: formData.title,
      categoryId: formData.categoryId,
      price: formData.price,
      author: formData.author,
    };

    this.bookService.saveBook(data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.onAddBook.emit();
        this.responseMessage = res.message;
        this.snackbar.openSuccessSnackBar(this.responseMessage, 'success');
      },
      error: (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbar.openErrorSnackBar(
          this.responseMessage,
          GlobalConstant.error
        );
      },
    });
  }

  //update dialog

  updateBook() {
    const formData = this.bookForm.value;
    const id = this.dialogData.data.id;
    const data: BooksRequest = {
      title: formData.title,
      categoryId: formData.categoryId,
      price: formData.price,
      author: formData.author,
    };

    this.bookService.updateBook(id, data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.onEditBook.emit();
        this.responseMessage = res.message;
        this.snackbar.openSuccessSnackBar(this.responseMessage, 'success');
      },
      error: (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbar.openErrorSnackBar(
          this.responseMessage,
          GlobalConstant.error
        );
      },
    });
  }
}
