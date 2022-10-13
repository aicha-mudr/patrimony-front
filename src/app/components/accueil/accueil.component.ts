import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectationdemand } from 'src/app/models/affectationdemand.model';
import { Demandstate } from 'src/app/models/demandstate.model';
import { Invproduct } from 'src/app/models/invproduct.model';
import { Noinvproduct } from 'src/app/models/noinvproduct.model';
import { Product } from 'src/app/models/product.model';
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
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})


export class AccueilComponent implements OnInit {

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
  public Invproducts : Array<Invproduct> = [];
  public products : Product[];
  public Ruptureproducts : Array<Product> = [];
  myArrInvproducts : Array<Invproduct> = [];
  myArrNOInvproducts : Array<Noinvproduct> = [];
  TabProductaffected:Array<Productaffected> =[]
  EnInstance:number=0
  EnAttente:number=0
  livrer:number=0

  
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

    ngOnInit(): void {
      this.myArrInvproductsBydemand = this.sharedService.getmyArrInvproductsBydemand();
      this.myArrNoinvproductsAffected = this.sharedService.getmyArrNoinvproductsAffected();
  
      
      this.addedDemand = this.sharedService.getaffectedDemandsByNumDemand();
  
      this.Noinvproducts = this.sharedService.getNoinvproducts();
  
      this.addedProductaffected = this.sharedService.getProductaffecteds();
  
      this.getAffectedDemands()
      this.getProductsaffected()
      this.getInvProducts()
      this.getNoinvProducts()
      this.Count()
      this.getProducts();
      this.Rupture()
      
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
  
    public async getInvProducts(): Promise<any> {
      (this.invproductService.getInvproducts()).subscribe(
    (response: Invproduct[]) => {
      this.Invproducts= response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
    }
  
    public async getAffectedDemands(): Promise<void> {
      this.affectationdemandService.getAffectationdemands().subscribe(
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
      
      this.errors = [];
      this.productaffectedService.addProductaffected(productaffected)
        .subscribe(data => {
            var win_timer = setInterval(function() {
              clearInterval(win_timer);
  
            }, 100); this.t;
          },
          error => {
            this.errors = error.error.errors;
          });
    }
  
    public  async getNoinvProductByIdAffProd(idprod : number): Promise<Noinvproduct[]> {
      for(let elem of this.Noinvproducts){
        for(let item of elem.productaffecteds){
        if(item.id == idprod)  {
          this.myArrNOInvproducts.push(elem) ;
        }
      }
      }
      return(this.myArrNOInvproducts)
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
      this. getNoinvProducts()
      for(let i in this.Noinvproducts){
        console.log(i+this.Noinvproducts[i]);
        
        if(this.Noinvproducts[i].idProduct.designation === designation)  {
          return this.Noinvproducts[i] ;
         
          
        }else{console.log('false',this.Noinvproducts[i]);
      }
      }
    }

    public async Count(){
      await this.getAffectedDemands();
      await new Promise(f => setTimeout(f, 500));

      
      for(let item of this.affectedDemands){
        
        if(item.demandstate.id==1){
          this.EnInstance+=1
        }
        if(item.demandstate.id==2){
          this.EnAttente+=1
        }
        if(item.demandstate.id==3){
          this.livrer+=1
        }
      }
    }

    public async Rupture(){
      console.log("guhjk")
      await this.getAffectedDemands();
      await this.getProducts()
      await this.getNoinvProducts()
      await new Promise(f => setTimeout(f, 500));

      
      for(let item of this.products){
        console.log(item)
        for(let elem of this.Noinvproducts){
        console.log("guhjk",elem)
        if(item.minQuantity>elem.quantityStock && item.id==elem.idProduct.id){
          this.Ruptureproducts.push(item)
        }
      }
      }
    }
  

}
