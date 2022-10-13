import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-all-demand-affectation',
  templateUrl: './all-demand-affectation.component.html',
  styleUrls: ['./all-demand-affectation.component.scss']
})
export class AllDemandAffectationComponent implements OnInit {

  @ViewChild('content',{static:false}) el!:ElementRef;
  @ViewChild('myForm') form: NgForm;
  
  public myArrInvproductsBydemand : Array<Invproduct> = [];
  public Noinvproducts : Array<Noinvproduct> = [];
  public myArrNoinvproductsAffected : Array<Noinvproduct> = [];
  public addedDemand : Affectationdemand= new Affectationdemand();
  public item2 :Productaffected= new Productaffected();
  p:number=1;
  public Productsaffected : Array<Productaffected> = [];
  public errors: string [];
  private t: any;
  public affectedDemands : Array<Affectationdemand> = [];
  public addedProductaffected : Productaffected= new Productaffected();
  public states : Demandstate[];
  public Invproducts : Array<Invproduct> = [];
  myArrInvproducts : Array<Invproduct> = [];
  myArrNOInvproducts : Array<Noinvproduct> = [];
  TabProductaffected:Array<Productaffected> =[]


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
    
  }



  key:string ="id";
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse
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
    this.TabProductaffected = this.Productsaffected
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
      if(this.Noinvproducts[i].idProduct.designation === designation)  {
        return this.Noinvproducts[i] ;
       
        
      }else{console.log('false',this.Noinvproducts[i]);
    }
    }
  }

  editDemand(demand: Affectationdemand) {
    for(let item of this.Invproducts){
      if(item.idDemandaffectation!=null){
      console.log(item.idDemandaffectation.id)
      if(  item.idDemandaffectation.id==demand.id){
        this.myArrInvproducts.push(item)
      }
    }
    }
    this.sharedService.setmyArrInvproductsBydemand(this.myArrInvproducts)
    this.sharedService.setmyArrNoinvproductsAffected(this.Noinvproducts)
    this.sharedService.setaffectedDemandsByNumDemand(demand);

    if(demand.demandstate.id==2){
      this.route.navigate(['/detailsDemandAffectedComponent']);
    }
    if(demand.demandstate.id==1){
      this.route.navigate(['/Affectationdemand']);
    }
    

  }
  public async detail(demand: Affectationdemand) {
    this.sharedService.setaffectedDemandsByNumDemand(demand);
    
    for(let item of this.Invproducts){
      if(item.idDemandaffectation!=null && item.idDemandaffectation.id==demand.id){
        this.myArrInvproducts.push(item)
        
      }
    }
    this.sharedService.setmyArrInvproductsBydemand(this.myArrInvproducts)
    this.route.navigate(['/detailDemandLivreeComponent']);
    
    
    
  }

}