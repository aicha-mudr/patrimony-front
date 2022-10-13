import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {CategoryManagement} from "../../models/category-management.model";
import {Subcategory} from "../../models/subcategory.model";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubcategoryService} from "../../services/subcategory.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {SubCategoryComponent} from "../sub-category/sub-category.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit{
  public errors: string [];
  public  category : CategoryManagement[];
  public  categoryP : CategoryManagement;
  public subcategoryComponent : SubCategoryComponent;
  public selectedCategory : CategoryManagement;
  public addedSubcategory : Subcategory = new Subcategory();
  public categories : Array<CategoryManagement> = [];
  public subcategories : Array<Subcategory> = [];
  public updatedSubcategory: Subcategory;

  constructor(private subcategoryService: SubcategoryService , private router : Router){};
  @ViewChild('myForm') form: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Input() userInfo: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  clickedUser: any;

  options = [
    {id: '1', value: true , val:'Oui'},
    {id: '2', value: false , val:'Non'},

  ]
  private t: any;
  ngOnInit() {
    this.getSubcategories();
    this.getCategories();
    console.log("receive "+ this.userInfo);
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


  onSubmit(){

    console.log(this.form.value.subcategoryDetails);
    this.addedSubcategory.subcategoryName=this.form.value.subcategoryDetails.subcategoryName;
    this.addedSubcategory.inventory=this.form.value.subcategoryDetails.inventory;
    this.addedSubcategory.serie=this.form.value.subcategoryDetails.serie;
    this.addedSubcategory.categories=this.getCategory(this.form.value.subcategoryDetails.categoryId);

    console.log(this.addedSubcategory);
    this.saveSubcategory(this.addedSubcategory);
    this.router.navigate(['/categoryManagement']);


  }
  public getSubcategories(): void {
    this.subcategoryService.getSubcategories().subscribe(
      (response: Subcategory[]) => {
        this.subcategories = response;
        for (let subcat in this.subcategories){
          console.log(this.subcategories);
        }


        console.log(this.subcategories);


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getCategories(): void {
    this.subcategoryService.getCategories().subscribe(
      (response: CategoryManagement[]) => {
        this.categories = response;
        console.log(this.categories);


      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getCategory(id : number): CategoryManagement {
    for(let i in this.categories){
      if(this.categories[i].id == id)  {
        return this.categories[i] ;
      }
    }


  }



}
