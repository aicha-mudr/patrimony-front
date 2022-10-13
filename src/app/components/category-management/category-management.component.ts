import { HttpErrorResponse } from '@angular/common/http';
import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryManagement } from 'src/app/models/category-management.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AddSubcategoryComponent} from "../add-subcategory/add-subcategory.component";
import {SubCategoryComponent} from "../sub-category/sub-category.component";

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  public errors: string [];
  p:number=1;
  @ViewChild('myForm') form: NgForm;

  public subcategories: Subcategory[];
  private t: any;
  private inputsubcategory: Subcategory = new Subcategory();
  private clickedUser: any;
  public updatedSubcategory: Subcategory =new Subcategory();

  options = [
    {id: '1', value: true , val:'Oui'},
    {id: '2', value: false , val:'Non'},

  ]
  public categories : Array<CategoryManagement> = [];
  mySubcategory: Subcategory =new Subcategory();
  public modeselect =this.categories[0];


  constructor( private categoryService: CategoryService ,private router : ActivatedRoute,private route : Router,
               private subcategoryService: SubcategoryService){}

  async ngOnInit() {
    this.getCategories();
    this.getSubcategories();
  }
  public comparFen(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
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
        console.log(this.subcategories);
        
        //console.log(this.subcategories[0].products[0].codeProduct);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteSubcategory(subcategory : Subcategory) {
    if(confirm('Êtes vous sûr de vouloir supprimer la valeur?')) {
      this.subcategoryService.deleteSubcategory(subcategory.id).subscribe(
        (resp) => {
          console.log(resp);
          this.getById(subcategory.id);
          this.route.navigate(['categoryManagement'])
            .then(() => {
              window.location.reload();
            });
        },
        (err) => {
          console.log(err);
        }
      );
      console.log("item deleted : " + subcategory.id);
    }
  }

  private getById(id: number) {
    this.subcategoryService.getById(id);
  }


  public onSelect(data : Subcategory)
  {
    this.route.navigate(['/addSubcategory'], { "relativeTo": this.router});
    this.clickedUser = data;
    console.log("clickedUser : " +this.clickedUser.id);
  }
  saveSubcategory(subcateory : Subcategory) {


    this.errors = [];
    this.subcategoryService.addSubcategory(subcateory)
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
  updateSubcategory(subcateory : SubCategoryComponent) {


    this.errors = [];
    this.subcategoryService.updateSubcategory(subcateory)
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


  
  onSubmit(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {

        return;}

    }

    this.updatedSubcategory.subcategoryName=this.form.value.subcategoryDetails.subcategoryName;
    this.updatedSubcategory.inventory=this.form.value.subcategoryDetails.inventory;
    this.updatedSubcategory.serie=this.form.value.subcategoryDetails.serie;
    this.updatedSubcategory.categories=this.getCategory(this.form.value.subcategoryDetails.categoryId);
    this.updatedcategory= this.updatedSubcategory.categories;
    console.log(this.updatedSubcategory);
    this.saveSubcategory(this.updatedSubcategory);
    this.route.navigate(['/categoryManagement']);


  }
  public getCategory(id : number): CategoryManagement {
    for (let i in this.categories) {
      if (this.categories[i].id == id) {
        return this.categories[i];
        
      }
    }
  }

  editSubcategory(subcategory : Subcategory) {
    this.updatedSubcategory=subcategory ;
    console.log('donnees '+this.updatedSubcategory.categories.categoryName);

  }

  key:string ="id";
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse
  }

  subcategoryName:any;
  SearchSubCateg(){
    if(this.subcategoryName== ""){
      this.ngOnInit();
    }else{
      this.subcategories=this.subcategories.filter(res=>{
          return res.subcategoryName.toLocaleLowerCase().match(this.subcategoryName.toLocaleLowerCase())
        }
      );
    }
  }

  categoryName:any;
  updatedcategory : CategoryManagement;mySelectForm: any;

  SearchCateg(){
    if(this.categoryName== ""){
      this.ngOnInit();
    }else{
      this.categories=this.categories.filter(res=>{
          return res.categoryName.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase())
        }
      );
    }
  }
  // Get row item from array

}
