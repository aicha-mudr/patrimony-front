import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Affectationdemand } from 'src/app/models/affectationdemand.model';
import { Demandstate } from 'src/app/models/demandstate.model';
import { Invproduct } from 'src/app/models/invproduct.model';
import { Noinvproduct } from 'src/app/models/noinvproduct.model';
import { Productaffected } from 'src/app/models/productaffected.model';
import { AffectationdemandService } from 'src/app/services/affectationdemand.service';
import { DeliverynoinvService } from 'src/app/services/deliverynoinv.service';
import { DemandstateService } from 'src/app/services/demandstate.service';
import { EntitytableService } from 'src/app/services/entitytable.service';
import { InvproductService } from 'src/app/services/invproduct.service';
import { NoinvproductService } from 'src/app/services/noinvproduct.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductaffectedService } from 'src/app/services/productaffected.service';
import { ProductstateService } from 'src/app/services/productstate.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-details-demand-affected',
  templateUrl: './details-demand-affected.component.html',
  styleUrls: ['./details-demand-affected.component.scss']
})
export class DetailsDemandAffectedComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;
  
  
  public myArrInvproductsBydemand : Array<Invproduct> = [];
  public Noinvproducts : Array<Noinvproduct> = [];
  public myArrNoinvproductsAffected : Array<Noinvproduct> = [];
  public addedDemand : Affectationdemand= new Affectationdemand();
  public item2 :Productaffected= new Productaffected();

  public Productsaffected : Array<Productaffected> = [];
  public errors: string [];
  private t: any;
  public affectedDemands : Array<Affectationdemand> = [];
  public addedProductaffected : Productaffected= new Productaffected();
  public states : Demandstate[];


  constructor(private datePipe : DatePipe ,
    private productService : ProductService,
    private invproductService : InvproductService,private sharedService : SharedServiceService,private noinvproductService : NoinvproductService,
    private subcategService :SubcategoryService, 
    private affectationdemandService :AffectationdemandService, 
    private entitytableService :EntitytableService, 
    private productaffectedService :ProductaffectedService,
    private deliverynoinvService:DeliverynoinvService,
    private demandstateservice:DemandstateService,
    private productstateservice:ProductstateService, private route : Router){};

  async ngOnInit(): Promise<void> {
    this.myArrInvproductsBydemand = this.sharedService.getmyArrInvproductsBydemand();
    console.log('myArrInvproductsBydemand : ' + this.sharedService.getmyArrInvproductsBydemand())
    this.myArrNoinvproductsAffected = this.sharedService.getmyArrNoinvproductsAffected();
    console.log('myArrNoinvproductsAffected : ' + this.sharedService.getmyArrNoinvproductsAffected())
    this.getNoinvProducts()
    this.addedDemand = this.sharedService.getaffectedDemandsByNumDemand();
    console.log('addedDemand : ' + this.sharedService.getaffectedDemandsByNumDemand())

    this.Noinvproducts = this.sharedService.getNoinvproducts();
    console.log('Noinvproducts : ' + this.sharedService.getNoinvproducts())

    this.addedProductaffected = this.sharedService.getProductaffecteds();

    this.getAffectedDemands()
    await this.getProductsaffected()
    console.log('products affected',this.Productsaffected);
    
    this.getStates()
    console.log(this.affectedDemands)
  }

  

  public async getProductsaffected(): Promise<void> {
     (await this.productaffectedService.getProductsaffected()).subscribe(
      (response: Productaffected[]) => {
        this.Productsaffected = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }

  public async getAffectedDemands(): Promise<void> {
    await this.affectationdemandService.getAffectationdemands().subscribe(
      (response: Affectationdemand[]) => {
        this.affectedDemands = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  saveNoinvproduct(noinvproduct : Noinvproduct) {
    this.errors = [];
    this.noinvproductService.updateNoInvproduct(noinvproduct)
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

  saveAffectedDemand(affectedDemand : Affectationdemand) {
    this.errors = [];
    this.affectationdemandService.addAffectationdemand(affectedDemand)
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

  public  async getDemandStateById(id : number): Promise<Demandstate> {
    for(let i in this.states){
      if(this.states[i].id == id)  {
        return this.states[i] ;
      }
    }
  }

  public async getStates(): Promise<void> {
    this.demandstateservice.getDemandstate().subscribe(
      (response: Demandstate[]) => {
        this.states = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  async saveProductaffected(productaffected : Productaffected) {
    console.log('saved');
    
    this.errors = [];
    this.productaffectedService.addProductaffected(productaffected)
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

  public async getNoinvProducts(): Promise<any> {
    (this.noinvproductService.getNoInvproducts()).subscribe(
  (response: Noinvproduct[]) => {
    this.Noinvproducts= response;
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
  );
  }
  public  getNoinvProductBydesignation(designation : string): Noinvproduct{
    console.log('working');
    this. getNoinvProducts()
    for(let i in this.Noinvproducts){
      console.log(i+this.Noinvproducts[i]);
      
      if(this.Noinvproducts[i].idProduct.designation === designation)  {
        console.log('true',this.Noinvproducts[i]);
        return this.Noinvproducts[i] ;
       
        
      }else{console.log('false',this.Noinvproducts[i]);
    }
    }
  }
  public  async getDemandaffectedBynumDemand(NUMDemand : string): Promise<Affectationdemand> {
    for(let i in this.affectedDemands){
      if(this.affectedDemands[i].numDemand == NUMDemand)  {
        return this.affectedDemands[i] ;
      }
      
    }
    console.log(this.affectedDemands)
  }
  public async LivrerDemande(){
    this.addedDemand.numBonSortie=this.form.value.DemandDetails.numBonSortie
    this.addedDemand.dateBonSortie=this.form.value.DemandDetails.dateBonSortie
    this.addedDemand.demandstate=await this.getDemandStateById(3)
    console.log('added demand',this.productService)
    await this.getAffectedDemands
    this.saveAffectedDemand(this.addedDemand);

    console.log('all products affected' , this.Productsaffected)
    for(let i in this.Productsaffected){
      console.log(i);
      
      this.Productsaffected[i].idProductaffectednv=  this.getNoinvProductBydesignation( this.Productsaffected[i].noinvdesignation);
      this.Productsaffected[i].idAffectationdemand=await this.getDemandaffectedBynumDemand(this.Productsaffected[i].numDemand)
      //this.Productsaffected[i].idAffectationdemand=this.addedDemand
      console.log(i+this.Productsaffected[i].idProductaffectednv.id);
      await this.saveProductaffected(this.Productsaffected[i])
      this.getProductsaffected
      console.log('saved 2',this.Productsaffected);
      
    }
    console.log(this.addedDemand)
    console.log(this.Productsaffected)
    await new Promise(f => setTimeout(f, 1000));
    await this.getAffectedDemands();
    
    this.sharedService.setProductaffecteds(this.addedProductaffected);
    this.sharedService.setmyArrInvproductsBydemand(this.myArrInvproductsBydemand);
    this.sharedService.setmyArrNoinvproductsAffected(this.myArrNoinvproductsAffected);
    
    this.sharedService.setNoinvproducts(this.Noinvproducts);
    for(let i in this.Productsaffected){
      console.log(i);
      
      this.Productsaffected[i].idProductaffectednv=  this.getNoinvProductBydesignation( this.Productsaffected[i].noinvdesignation);
     // this.Productsaffected[i].idAffectationdemand=this.addedDemand
      console.log(i+this.Productsaffected[i].idProductaffectednv.id);
      await this.saveProductaffected(this.Productsaffected[i])
      this.getProductsaffected
      console.log('saved 2',this.Productsaffected);
      
    }
    this.route.navigate(['/detailDemandLivreeComponent']);
  }


}