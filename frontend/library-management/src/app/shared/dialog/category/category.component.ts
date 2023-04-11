import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categories, Category } from 'src/app/model/model';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GlobalConstant } from '../../globalconstant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  responseMessage: any;
  dialogAction: any = 'Add';
  action: any = 'Add';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private categoryService: CategoryService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      subcategory: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory() {
    const formData = this.categoryForm.value;
    const data: Category = {
      name: formData.name,
      subcategory: formData.subcategory,
    };

    this.categoryService.addCategory(data).subscribe({
      next: (res: any) => {
        this.responseMessage = res.message;
        this.snackbar.openSuccessSnackBar(this.responseMessage, '');
        this.dialogRef.close();
        this.onAddCategory.emit();
      },
      error: (err: any) => {
        this.dialogRef.close();
        if (err.error) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  }

  updateCategory() {
    const formData = this.categoryForm.value;

    const id = this.dialogData.data.id;

    const data: Category = {
      name: formData.name,
      subcategory: formData.subcategory,
    };

    this.categoryService.updateCategory(id, data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = res.message;
        console.log(this.responseMessage);
        this.snackbar.openSuccessSnackBar(this.responseMessage, 'success');
      },
      error: (err: any) => {
        this.dialogRef.close();
        if (err.error) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  }
}
