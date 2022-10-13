import {Component, OnInit, ViewChild} from '@angular/core';
import {Subcategory} from "../../models/subcategory.model";
import {Product} from "../../models/product.model";
import {CategoryManagement} from "../../models/category-management.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {SubcategoryService} from "../../services/subcategory.service";
import {NgForm} from "@angular/forms";
import {logExperimentalWarnings} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  public errors: string [];

  public addedProduct : Product = new Product();
  public categories : Array<CategoryManagement> = [];
  public categorySelected : CategoryManagement = new CategoryManagement();
  private t: any;
  constructor(private productService : ProductService ) { }
  @ViewChild('myForm') form: NgForm;
  public subcategories : Array<Subcategory> = [];
  public filtredSubcategories : Array<Subcategory> =[];


  ngOnInit(): void {
    this.getCategories();
    this.getSubCategories();
  }

  public getCategories(): void {
    this.productService.getCategories().subscribe(
      (response: CategoryManagement[]) => {
        this.categories = response;
        console.log(this.categories);


      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getSubCategories(): void {
    this.productService.getSubcategories().subscribe(
      (response: CategoryManagement[]) => {
        this.subcategories = response;
        this.filtredSubcategories = response;
        console.log(this.subcategories);


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onSubmit() {
    console.log(this.form.value.productDetails);
    this.addedProduct.codeProduct=this.form.value.productDetails.codeProduct;
    this.addedProduct.minQuantity=this.form.value.productDetails.minQuantity;
    this.addedProduct.designation=this.form.value.productDetails.Designation;
    this.addedProduct.subcategory=this.getSubcategory(this.form.value.productDetails.subCategoryId);
   this.saveProduct(this.addedProduct);
  }
  getSubcategory(id : number){
    for(let i in this.filtredSubcategories){
      if(this.filtredSubcategories[i].id == id)  {
        return this.filtredSubcategories[i] ;
      }
    }
  }

  saveProduct(newProduct : Product){
    this.errors = [];
    this.productService.addProduct(newProduct)
      .subscribe(data => {
          var win_timer = setInterval(function() {

            window.location.reload();
            clearInterval(win_timer);

          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }

  onCategoryselected(selectedCat:any) {

        console.log('non filtred  ',selectedCat)
        this.filtredSubcategories=[]
        for(let i in this.subcategories) {
          if (this.subcategories[i].categories.id== selectedCat) {

            this.filtredSubcategories.push(this.subcategories[i]);

          }

        }
    console.log('filtred : ',this.filtredSubcategories)

  }
}
