import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import { CategoryManagement } from 'src/app/models/category-management.model';
import { Product } from 'src/app/models/product.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SubCategoryComponent} from "../sub-category/sub-category.component";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;
  public errors: string [];

  public products : Product[];
  public categories: CategoryManagement[];
  public subcategories: Subcategory[];
  public productlengthArray: Number[];
  public filtredSubcategories : Array<Subcategory> =[];
  public updatedProduct : Product = new Product();
  p:number=1;

  public categorySelected : CategoryManagement = new CategoryManagement();
  myProduct: Product = new Product();
  private t: any;


  constructor(private productService: ProductService , private categoryService: CategoryService ,private route : Router,
    private subcategoryService: SubcategoryService){}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getSubcategories();
  }


  
  key:string ="id";
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse
  }

  getSubcategory(id : number){
    for(let i in this.filtredSubcategories){
      if(this.filtredSubcategories[i].id == id)  {
        return this.filtredSubcategories[i] ;
      }
    }
  }
  public getProducts(): void {
    this.productService.getProduct().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
  public getCategories(): void {
    this.categoryService.getCategory().subscribe(
      (response: CategoryManagement[]) => {
        this.categories = response;

        console.log(this.categories);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getSubcategories(): void {
    this.subcategoryService.getSubcategories().subscribe(
      (response: Subcategory[]) => {
        this.subcategories = response;
        this.filtredSubcategories= response;



       // console.log(this.subcategories);
        //console.log(this.subcategories[0].products[0].codeProduct);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  private getById(id: number) {
    this.productService.getById(id);
  }

  deleteProduct(product : Product) {
    if(confirm('Êtes vous sûr de vouloir supprimer la valeur?')) {
      this.productService.deleteProduct(product.id).subscribe(
        (resp) => {
          console.log(resp);
          this.getById(product.id);
          this.route.navigate(['productManagement'])
            .then(() => {
              window.location.reload();
            });
        },
        (err) => {
          console.log(err);
        }
      );
      console.log("item deleted : " + product.id);
    }
  }

  onSubmit(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {

        return;}

    }

    this.updatedProduct.codeProduct=this.form.value.productDetails.codeProduct;
    this.updatedProduct.minQuantity=this.form.value.productDetails.minQuantity;
    this.updatedProduct.designation=this.form.value.productDetails.Designation;
    this.updatedProduct.subcategory=this.getSubcategory(this.form.value.productDetails.subCategoryId);
    console.log(this.updatedProduct);
    this.updateProduct(this.updatedProduct);
    this.route.navigate(['/productManagement']);


  }

  updateProduct(product : Product) {


    this.errors = [];
    this.productService.updateProduct(product)
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

  editProduct(product : Product) {
    this.updatedProduct=product ;
    console.log('donnees '+this.updatedProduct.codeProduct);



  }
}
