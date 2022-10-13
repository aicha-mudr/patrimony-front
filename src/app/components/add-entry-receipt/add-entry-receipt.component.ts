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
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { Deliverynoinv } from 'src/app/models/deliverynoinv.model';
import { DeliverynoinvService } from 'src/app/services/deliverynoinv.service';

@Component({
  selector: 'app-add-entry-receipt',
  templateUrl: './add-entry-receipt.component.html',
  styleUrls: ['./add-entry-receipt.component.scss']
})
export class AddEntryReceiptComponent implements OnInit {
  readonly = false;

  private t: any;
  private l: any;
  public errors: string [];
  public inv: Subcategory= new Subcategory();

  myDeliveryReceipt: EntryDeliveryReceipt;

  public addedProduct : Product = new Product();
  public addedProduct2 : Product = new Product();
  public addedEntryDemand : EntryDemand= new EntryDemand();
  public addedDeliveryReceipt : EntryDeliveryReceipt= new EntryDeliveryReceipt();
  public addedInvproduct : Invproduct= new Invproduct();
  public addedNoinvproduct : Noinvproduct= new Noinvproduct();
  public addedDeliverynoinv : Deliverynoinv= new Deliverynoinv();
  public addedSubcateg : Subcategory= new Subcategory();


  public EntryDemands : Array<EntryDemand> = [];
  public EntryDeliveryReceipts : Array<EntryDeliveryReceipt> = [];
  public Deliverynoinvs : Array<Deliverynoinv> = [];
  public Noinvproducts : Array<Noinvproduct> = [];
  public Invproducts : Array<Invproduct> = [];

  public categories : Array<CategoryManagement> = [];
  public categorySelected : CategoryManagement = new CategoryManagement();
  public categorySelected2 : CategoryManagement = new CategoryManagement();
  public subcategories : Array<Subcategory> = [];


  public filtredSubcategories : Array<Subcategory> =[];
  public filtredProducts : Array<Product> =[];

  public products : Product[];
  new: boolean = false;


  constructor(private entryDemandService: EntryDemandService ,
    private entryDeliveryService: EntryDeliveryService ,private productService : ProductService,
    private invproductService : InvproductService,private noinvproductService : NoinvproductService,  
    private subcategService :SubcategoryService,
    private deliverynoinvService:DeliverynoinvService, private sharedService : SharedServiceService, private router : Router){};

    
  @ViewChild('myForm') form: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Input() userInfo: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {
    this.addedEntryDemand = this.sharedService.getMessage();
    console.log('receive : ' + this.sharedService.getMessage())
    this.getDeliveryReceipts();
    this.getEntryDemands();
    this.getCategories();
    this.getSubCategories();
    this.getProducts();
    this.getNoinvProducts();
    this.getInvProducts();
    this.getDeliverynoinvs();
    
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


  onSubmit(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}
    }
    this.saveEntryDemand(this.addedEntryDemand);
    

  }

  
  public getCategories(): void {
    this.productService.getCategories().subscribe(
      (response: CategoryManagement[]) => {
        this.categories = response;
        
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
        //if()
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCategoryselected(selectedCat:any) {

    
    this.filtredSubcategories=[]
    for(let i in this.subcategories) {
      if (this.subcategories[i].categories.id== selectedCat) {

        this.filtredSubcategories.push(this.subcategories[i]);

      }
    }

    this.filtredProducts=[]
    for(let i in  this.products) {
      if (this.products[i].subcategory.id== selectedCat) {
        this.filtredProducts.push(this.products[i]);
        
      }
  }
}

onCategoryselected2(selectedCat:any) {

  this.filtredSubcategories=[]
  for(let i in this.subcategories) {
    if (this.subcategories[i].categories.id== selectedCat) {

      this.filtredSubcategories.push(this.subcategories[i]);

    }
  }

  this.filtredProducts=[]
  for(let i in  this.products) {
    if (this.products[i].subcategory.id== selectedCat) {
      this.filtredProducts.push(this.products[i]);
      
    }
}
}


  public getProducts(): void {
    this.productService.getProduct().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.filtredProducts = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getProduct(id : number){
    for(let i in this.filtredProducts){
      if(this.filtredProducts[i].id == id)  {
        return this.filtredProducts[i] ;
      }
    }
  }

  public getProductById(id : number): Product {
    for(let i in this.products){
      if(this.products[i].id == id)  {
        return this.products[i] ;
      }
    }
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


  public getDeliverynoinvById(id : number): Deliverynoinv {
    for(let i in this.Deliverynoinvs){
      if(this.Deliverynoinvs[i].id == id)  {
        
        return this.Deliverynoinvs[i] ;
      }
    }
  }


  onDesignationselected(selectedCat: any) {
    this.filtredProducts=[]
    for(let i in  this.products) {
      if (this.products[i].subcategory.id== selectedCat) {
        this.filtredProducts.push(this.products[i]);
        
      }
  }
  }

  saveInvProductReceipt(invproduct : Invproduct) {
    this.errors = [];
    this.invproductService.addInvproduct(invproduct)
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

  saveNoInvProductReceipt(noinvproduct : Noinvproduct) {
    this.errors = [];
    this.noinvproductService.addNoInvproduct(noinvproduct)
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

  saveDeliverynoinv(deliverynoinv : Deliverynoinv) {
    this.errors = [];
    this.deliverynoinvService.addDeliverynoinv(deliverynoinv)
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

  public getProductbydesignation(designation : string): Product {
    for (let i in this.products) {
      if (this.products[i].designation == designation) {
        return this.products[i];
      }
    }
  }

  getSubcategory(id : number){
    for(let i in this.filtredSubcategories){
      if(this.filtredSubcategories[i].id == id)  {
        return this.filtredSubcategories[i] ;
      }
    }
  }

  public async getEntryDemands(): Promise<any> {
    (await this.entryDeliveryService.getEntryDemands()).subscribe(
  (response: EntryDemand[]) => {
    this.EntryDemands = response;
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);
}

public async getDeliverynoinvs(): Promise<any> {
  (await this.deliverynoinvService.getDeliverynoinvs()).subscribe(
(response: Deliverynoinv[]) => {
  this.Deliverynoinvs = response;
},
(error: HttpErrorResponse) => {
  alert(error.message);
}
);
}

  public async getDeliveryReceipts(): Promise<any> {
    (await this.entryDeliveryService.getEntryDeliveryReceipts()).subscribe(
  (response: EntryDeliveryReceipt[]) => {
    this.EntryDeliveryReceipts = response;
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);
}

public async getNoinvProducts(): Promise<any> {
  (await this.noinvproductService.getNoInvproducts()).subscribe(
(response: Noinvproduct[]) => {
  this.Noinvproducts= response;
},
(error: HttpErrorResponse) => {
  alert(error.message);
}
);
}

public async getInvProducts(): Promise<any> {
  (await this.invproductService.getInvproducts()).subscribe(
(response: Invproduct[]) => {
  this.Invproducts= response;
},
(error: HttpErrorResponse) => {
  alert(error.message);
}
);
}

public getEntryDemand(numDepense : string): EntryDemand {
  for (let i in this.EntryDemands) {
    if (this.EntryDemands[i].numDepense == numDepense) {
      return this.EntryDemands[i];
    }
  }
  
  }


  public async getDeliveryReceipt(id : number): Promise<EntryDeliveryReceipt> {
    await new Promise(f => setTimeout(f, 500));
  
    this.getDeliveryReceipts();
   
  
  for (let i in this.EntryDeliveryReceipts) {
    if (this.EntryDeliveryReceipts[i].numDeliveryReceipt == id) {
      return this.EntryDeliveryReceipts[i];
    }
  }
  
  }

public getnoinvProduct(id : number): Noinvproduct{
  for (let i in this.Noinvproducts) {
    if (this.Noinvproducts[i].id == id) {
      return this.Noinvproducts[i];
    }
  }
  
  }


  changeOption(value){
    this.inv.id=value
    this.inv=this.getSubcategory(value)
  }

  getNoinvProduct(noinvproduct: Noinvproduct) {
    this.getNoinvProducts;

    for (let i in this.Noinvproducts) {
      
      if (this.Noinvproducts[i].idProduct.id == noinvproduct.idProduct.id) {
        return this.Noinvproducts[i];
        
        
      }
       
    } 
        this.new = true
    return noinvproduct ;
  }

  async updateNoInvProductReceipt(noinvproduct : Noinvproduct) {
    this.errors = [];
    let updatedProduct = this.getNoinvProduct(noinvproduct);



    if(this.new){
      
      updatedProduct.quantityStock = this.addedNoinvproduct.quantityStock;
      
    }else{
      updatedProduct.quantityStock += this.addedNoinvproduct.quantityStock;
    }
    this.new=false;
    this.noinvproductService.updateNoInvproduct(updatedProduct)
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

  async onSubmitProductReceipt(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}
    }
    if(this.inv.inventory){
    this.addedInvproduct.idProduct=this.getProductById(this.form.value.EntryDetails.designation);

    
    let id_delivery_receipt=this.addedDeliveryReceipt.numDeliveryReceipt;
    await this.getDeliveryReceipts();
    await this.getInvProducts();
 
    await new Promise(f => setTimeout(f, 1000));
    this.addedInvproduct.idDelivery = await this.getDeliveryReceipt(id_delivery_receipt);
    this.saveInvProductReceipt(this.addedInvproduct);
    this.Invproducts.push(this.addedInvproduct);
    
    }else{
      ///////////////////////////////////////////////
      this.addedNoinvproduct.idProduct=this.getProductById(this.form.value.EntryDetails.designation);
      this.addedNoinvproduct.quantityStock = this.form.value.EntryDetails.Quantity;
    
      
      this.updateNoInvProductReceipt(this.addedNoinvproduct);
      await new Promise(f => setTimeout(f, 1000));
      await  this.getNoinvProducts();
          let id_productnv=this.addedNoinvproduct.idProduct.id;
          this.addedDeliverynoinv.idProductnv = await this.getNoinvroductById(id_productnv);
          
          //////////////////////////////////////////////


        let id_delivery_receipt=this.addedDeliveryReceipt.numDeliveryReceipt;
        await this.getDeliveryReceipts();
        await this.getDeliverynoinvs();
        await this.getNoinvProducts();
        await new Promise(f => setTimeout(f, 1000));
        this.addedDeliverynoinv.idEntrydeliveryreceipt= await this.getDeliveryReceipt(id_delivery_receipt);
        
       
        

      
      this.saveDeliverynoinv(this.addedDeliverynoinv);

      this.Noinvproducts.push(this.addedNoinvproduct);
      this.Deliverynoinvs.push(this.addedDeliverynoinv)
    }
  }



  async onSubmit2() {
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}
    }
    
    let depense=this.addedEntryDemand.numDepense;
    await this.getEntryDemands();
    await new Promise(f => setTimeout(f, 500));
    this.addedDeliveryReceipt.idRequest = this.getEntryDemand(depense)
    this.saveEntrydeliveryReceipt(JSON.parse(JSON.stringify(this.addedDeliveryReceipt)));
    
    await this.getDeliveryReceipts();
    await new Promise(f => setTimeout(f, 1000));
    await this.getDeliveryReceipts();

    this.myDeliveryReceipt =await this.getDeliveryReceipt(this.addedDeliveryReceipt.numDeliveryReceipt)
    console.log('myDeliveryReceipt',this.myDeliveryReceipt);
    
    this.readonly = true;
      this.sharedService.setReceipt(this.myDeliveryReceipt);
      this.router.navigate(['/addReceivedProducts']);
    }
public next() {
  this.sharedService.setReceipt(this.myDeliveryReceipt);
  this.router.navigate(['/validateEntryReceipt']);

}


 
}