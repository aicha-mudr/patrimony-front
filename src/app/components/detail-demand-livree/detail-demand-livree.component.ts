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
  selector: 'app-detail-demand-livree',
  templateUrl: './detail-demand-livree.component.html',
  styleUrls: ['./detail-demand-livree.component.scss']
})
export class DetailDemandLivreeComponent implements OnInit {

  @ViewChild('content2',{static:false}) el!:ElementRef;
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

  ngOnInit(): void {
    this.myArrInvproductsBydemand = this.sharedService.getmyArrInvproductsBydemand();
    console.log('myArrInvproductsBydemand : ' + this.sharedService.getmyArrInvproductsBydemand())
    this.myArrNoinvproductsAffected = this.sharedService.getmyArrNoinvproductsAffected();
    console.log('myArrNoinvproductsAffected : ' + this.sharedService.getmyArrNoinvproductsAffected())

    this.addedDemand = this.sharedService.getaffectedDemandsByNumDemand();
    console.log('addedDemand : ' + this.sharedService.getaffectedDemandsByNumDemand())

    this.Noinvproducts = this.sharedService.getNoinvproducts();
    console.log('Noinvproducts : ' + this.sharedService.getNoinvproducts())

    this.addedProductaffected = this.sharedService.getProductaffecteds();

    this.getAffectedDemands()
    this.getProductsaffected()
    console.log(this.affectedDemands)
  }


  makePDF(){
    let pdf=new jsPDF('p', 'pt', [1200,1200]);
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("BonSortie.pdf");
      }
    })
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


}