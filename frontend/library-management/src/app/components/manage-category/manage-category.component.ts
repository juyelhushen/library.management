import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categories } from 'src/app/model/model';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { CategoryComponent } from 'src/app/shared/dialog/category/category.component';
import { ConfirmationComponent } from 'src/app/shared/dialog/confirmation/confirmation.component';
import { GlobalConstant } from 'src/app/shared/globalconstant';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent {
  categories: Categories[] = [];
  responseMessage: any;
  displayedColumns: string[] = ['id', 'name', 'subcategory', 'action'];

  constructor(
    private categoryService: CategoryService,
    private snackbar: SnackbarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCountOfCategories() {
    const count = this.categories.length;
    return count;
  }

  addCategoryAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddCategory.subscribe((res) => {
      this.getCategories();
    });
  }

  updateCategoryAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditCategory.subscribe((res) => {
      this.getCategories();
    });
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

  deleteCategory(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete.',
      confirmation: true,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onEventStatusChange.subscribe((res:any)=>{
      dialogRef.close();
      this.categoryService.deleteCategory(id).subscribe({
        next: (res: any) => {
          this.categories = this.categories.filter((s) => {
            return id != s.id;
          });
          this.responseMessage = res.message;
          this.snackbar.openSuccessSnackBar(this.responseMessage, '');
        },
        error: (err: any) => {
          this.responseMessage = err.error.message;
          this.snackbar.openErrorSnackBar(this.responseMessage, '');
        },
      });
    })

  }
}
