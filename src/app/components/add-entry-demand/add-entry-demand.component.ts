import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EntryDeliveryReceipt } from 'src/app/models/entry-delivery-receipt.model';
import { EntryDemand } from 'src/app/models/entry-demand.model';
import { EntryDeliveryService } from 'src/app/services/entry-delivery.service';
import { EntryDemandService } from 'src/app/services/entry-demand.service';
import {async} from "@angular/core/testing";
import { CategoryManagement } from 'src/app/models/category-management.model';
import { ProductService } from 'src/app/services/product.service';
import { Subcategory } from 'src/app/models/subcategory.model';
import { Product } from 'src/app/models/product.model';
import { Invproduct } from 'src/app/models/invproduct.model';
import { InvproductService } from 'src/app/services/invproduct.service';
import { Noinvproduct } from 'src/app/models/noinvproduct.model';
import { NoinvproductService } from 'src/app/services/noinvproduct.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import {DatePipe} from "@angular/common";
import{SharedServiceService}from 'src/app/services/shared-service.service'
import { State } from 'src/app/models/state.model';
import { EntryStateServiceService } from 'src/app/services/entry-state-service.service';
@Component({
  selector: 'app-add-entry-demand',
  templateUrl: './add-entry-demand.component.html',
  styleUrls: ['./add-entry-demand.component.scss']
})
export class AddEntryDemandComponent implements OnInit {

  private t: any;
  private l: any;
  public errors: string [];
  public inv: Subcategory= new Subcategory();
  myDate = new Date();


  public addedProduct : Product = new Product();
  public addedEntryDemand : EntryDemand= new EntryDemand();
  public addedDeliveryReceipt : EntryDeliveryReceipt= new EntryDeliveryReceipt();
  public addedInvproduct : Invproduct= new Invproduct();
  public addedNoinvproduct : Noinvproduct= new Noinvproduct();
  public addedSubcateg : Subcategory= new Subcategory();
  public EntryStates : Array<State> = [];
  myState: State;

  public EntryDemands : Array<EntryDemand> = [];


  public categories : Array<CategoryManagement> = [];
  public categorySelected : CategoryManagement = new CategoryManagement();
  public subcategories : Array<Subcategory> = [];


  public filtredSubcategories : Array<Subcategory> =[];
  public filtredProducts : Array<Product> =[];

  public products : Product[];


  constructor(private entryDemandService: EntryDemandService ,private datePipe : DatePipe ,
              private entryDeliveryService: EntryDeliveryService ,private productService : ProductService,
              private invproductService : InvproductService,private sharedService : SharedServiceService,private noinvproductService : NoinvproductService,
              private subcategService :SubcategoryService, public stateService : EntryStateServiceService, private route : Router){};


  @ViewChild('myForm') form: NgForm;
  ngOnInit(): void {

  }


  saveEntryDemand(entryDemand : EntryDemand) {
    this.errors = [];
    this.entryDemandService.addEntryDemand(entryDemand)
      .subscribe(data => {
          var win_timer = setInterval(function() {
            //window.location.reload();
            clearInterval(win_timer);
          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }

  saveEntrydeliveryReceipt(entrydeliveryReceipt : EntryDeliveryReceipt) {
    this.errors = [];
    this.entryDeliveryService.addEntryDeliveryReceipt(entrydeliveryReceipt)
      .subscribe(data => {
          var win_timer = setInterval(function() {
            // window.location.reload();
            clearInterval(win_timer);
          }, 100); this.l;
        },
        error => {
          this.errors = error.error.errors;
        });
  }


  async onSubmit(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}

    }
    console.log(this.form.value.EntryDetails);

    this.addedEntryDemand.dateRequest=new Date(this.datePipe.transform(this.myDate, 'yyyy-MM-dd' ) );
    //this.addedEntryDemand.state.id=1;
    await this.getState();
    this.addedEntryDemand.state=this.myState;

    this.saveEntryDemand(this.addedEntryDemand);
    console.log(this.addedEntryDemand);
    this.sharedService.setMessage(this.addedEntryDemand);
    this.route.navigate(['/addEntryReceipt']);


  }
  async getStates(){
    (await this.stateService.getEntryStates()).subscribe(
  (response: State[]) => {
    this.EntryStates= response;
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
  );
  }

async getState(){
  await this.getStates();
  await new Promise(f => setTimeout(f, 500));

  for (let i in this.EntryStates) {
    if (this.EntryStates[i].id === 1) {

      this.myState= this.EntryStates[i];
      
    }else{
      
    }
  }
}



}