import { DatePipe } from '@angular/common';
import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectationdemand } from 'src/app/models/affectationdemand.model';
import { Invproduct } from 'src/app/models/invproduct.model';
import { Noinvproduct } from 'src/app/models/noinvproduct.model';
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
import {jsPDF} from "jspdf"
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Productaffected } from 'src/app/models/productaffected.model';
import { Demandstate } from 'src/app/models/demandstate.model';

@Component({
  selector: 'app-exit-request-details',
  templateUrl: './exit-request-details.component.html',
  styleUrls: ['./exit-request-details.component.scss']
})
export class ExitRequestDetailsComponent implements OnInit {
  @ViewChild('content',{static:false}) el!:ElementRef;
  @ViewChild('myForm') form: NgForm;
  NoinvProduct: any;

  makePDF(){
    let pdf=new jsPDF('p', 'pt', [1200,1200]);
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("BonDemande.pdf");
      }
    })
  }

  public myArrInvproductsBydemand : Array<Invproduct> = [];
  public Noinvproducts : Array<Noinvproduct> = [];
  public myArrNoinvproductsAffected : Array<Noinvproduct> = [];
  public addedDemand : Affectationdemand= new Affectationdemand();
  public item2 :Productaffected= new Productaffected();
  public readonly:boolean
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


    public Productsaffected : Array<Productaffected> = [];
    public errors: string [];
    private t: any;
    public affectedDemands : Array<Affectationdemand> = [];
    public addedProductaffected : Productaffected= new Productaffected();

  ngOnInit(): void {
    this.myArrInvproductsBydemand = this.sharedService.getmyArrInvproductsBydemand();
    console.log('myArrInvproductsBydemand : ' + this.sharedService.getmyArrInvproductsBydemand())
    this.myArrNoinvproductsAffected = this.sharedService.getmyArrNoinvproductsAffected();
    console.log('myArrNoinvproductsAffected : ' + this.sharedService.getmyArrNoinvproductsAffected())

    this.addedDemand = this.sharedService.getaffectedDemandsByNumDemand();
    console.log('addedDemand : ' + this.addedDemand.affectedProducts)

    this.Noinvproducts = this.sharedService.getNoinvproducts();
    console.log('Noinvproducts : ' + this.sharedService.getNoinvproducts())

    this.addedProductaffected = this.sharedService.getProductaffecteds();
    console.log(this.getIDaffectationDemandById(1));
    this.getAffectedDemands()
    this.getProductsaffected()
    this.testReadOnly()
    this.getStates()
    console.log(this.readonly)
    console.log(this.affectedDemands)
  }
  public testReadOnly(){
    console.log(this.addedDemand)
    for(let item of this.addedDemand.affectedProducts){
      if(item.quantityGaranted==null){
        this.readonly=false
        return
      }
      this.readonly=true
    }
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

  saveProductaffected(productaffected : Productaffected) {
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

  public  getIDaffectationDemandById(id : number): Affectationdemand{
    console.log('working');
    this.getProductsaffected()
    for(let i in this.Productsaffected){
      console.log(i+this.Productsaffected[i]);
      
      if(this.Productsaffected[i].id === id)  {
        console.log('true',this.Productsaffected[i]);
        return this.Productsaffected[i].idAffectationdemand ;
       
        
      }else{
        console.log('false',this.Productsaffected[i]);
    }
    }
  }
 async  DemandTreated(){
    
    this.addedDemand.signDate=this.form.value.DemandDetails.signDate
    this.addedDemand.demandstate=await this.getDemandStateById(2)
    console.log(this.getDemandStateById(2))
    console.log(this.addedDemand.demandstate)
    await new Promise(f => setTimeout(f, 1000));
    await this.getAffectedDemands();
    this.saveAffectedDemand(this.addedDemand);
    this.sharedService.setProductaffecteds(this.addedProductaffected);
    this.sharedService.setmyArrInvproductsBydemand(this.myArrInvproductsBydemand);
    this.sharedService.setmyArrNoinvproductsAffected(this.myArrNoinvproductsAffected);
    
    this.sharedService.setNoinvproducts(this.Noinvproducts);
    this.route.navigate(['/detailsDemandAffectedComponent']);
    
    console.log(this.addedDemand)
    console.log(this.myArrInvproductsBydemand)
    console.log(this.Noinvproducts)
    console.log(this.myArrNoinvproductsAffected)
    console.log(this.getIDaffectationDemandById(1));
    
  }

  public  async getNoinvroductById(id : number): Promise<Noinvproduct> {
    this.getNoinvProducts();
    await new Promise(f => setTimeout(f, 1000));

   for(let i in this.Noinvproducts){

     if(this.Noinvproducts[i].idProduct.id == id)  {
       return this.Noinvproducts[i] ;
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


 async AddQuantity(demand:any){
  await this.getAffectedDemands();
  console.log(this.addedDemand)
  for(let noinvproducts of this.Noinvproducts){
    
      if(!this.readonly){
        if(demand.noinvdesignation==noinvproducts.idProduct.designation){
        demand.quantityGaranted=demand.values
        demand.idProductaffectednv=noinvproducts
        this.NoinvProduct = await this.getNoinvroductById(noinvproducts.idProduct.id)
        if(this.NoinvProduct.quantityStock<demand.quantityGaranted) {
          if(confirm('Quantitée en stock insuffisante !')) {
            return;}
        }else{
        
        this.NoinvProduct.quantityStock-= demand.quantityGaranted;
        this.saveNoinvproduct(this.NoinvProduct)
        console.log('this.NoinvProduct',this.NoinvProduct);
        
        await new Promise(f => setTimeout(f, 1000));
        await this.getAffectedDemands();
        this.sharedService.setaffectedDemandsByNumDemand(this.addedDemand);
        this.saveAffectedDemand(this.addedDemand);
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
        console.log(demand.values)
        console.log(demand.quantityGaranted)
        console.log(demand.idProductaffectednv)
      }
      }
      }else{
        if(demand.noinvdesignation==noinvproducts.idProduct.designation){
        console.log(demand)
        demand.values=demand.quantityGaranted
        demand.idProductaffectednv=noinvproducts
        await new Promise(f => setTimeout(f, 1000));
        await this.getAffectedDemands();
        console.log(this.addedDemand)
        this.sharedService.setaffectedDemandsByNumDemand(this.addedDemand);
        console.log(this.addedDemand)
        this.saveAffectedDemand(this.addedDemand);
        }
        }
      }
    
    
  
}

}