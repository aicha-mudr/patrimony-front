import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Affectationdemand } from 'src/app/models/affectationdemand.model';
import { CategoryManagement } from 'src/app/models/category-management.model';
import { Deliverynoinv } from 'src/app/models/deliverynoinv.model';
import { Demandstate } from 'src/app/models/demandstate.model';
import { Entitytable } from 'src/app/models/entitytable.model';
import { Invproduct } from 'src/app/models/invproduct.model';
import { Noinvproduct } from 'src/app/models/noinvproduct.model';
import { Product } from 'src/app/models/product.model';
import { Productaffected } from 'src/app/models/productaffected.model';
import { Productstate } from 'src/app/models/productstate.model';
import { State } from 'src/app/models/state.model';
import { Subcategory } from 'src/app/models/subcategory.model';
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
  selector: 'app-affectationdemand',
  templateUrl: './affectationdemand.component.html',
  styleUrls: ['./affectationdemand.component.scss']
})
export class AffectationdemandComponent implements OnInit {
  readonly = false;
  private t: any;
  private l: any;
  public errors: string [];
  public inv: Subcategory= new Subcategory();
  myDate = new Date();
  public test : boolean  =false;

  public addedProduct : Product = new Product();
  public addedDemand : Affectationdemand= new Affectationdemand();
  public addedDemand2 : Affectationdemand= new Affectationdemand();
  public addedSubcateg : Subcategory= new Subcategory();
  public addedProductaffected : Productaffected= new Productaffected();
  public addedProductaffected2 : Productaffected= new Productaffected();
  public addedProduct2 : Product = new Product();
  public categorySelected2 : CategoryManagement = new CategoryManagement();
  public affectedDemands : Array<Affectationdemand> = [];
  public affectedDemandsByNumDemand : Array<Affectationdemand> = [];
  public addedInvproduct : Invproduct= new Invproduct();
  public addedNoinvproduct : Noinvproduct= new Noinvproduct();
  public invproduct : Invproduct= new Invproduct();
  public categories : Array<CategoryManagement> = [];
  public Productsaffected : Array<Productaffected> = [];
  public ProductsaffectedInv : Array<Productaffected> = [];
  public ProductsaffectedByNumDemand : Array<Productaffected> = [];
  public ProductsByNumDemandNoinvprod : Array<Productaffected> = [];
  public entitytables : Array<Entitytable> = [];
  public categorySelected : CategoryManagement = new CategoryManagement();
  public subcategories : Array<Subcategory> = [];
  
  public productsState : Array<Productstate> = [];
  public filtredSubcategories : Array<Subcategory> =[];
  public filtredEntitytables : Array<Entitytable> =[];
  public filtredProducts : Array<Product> =[];
  public filtredStates : Array<Demandstate> =[];
  public Noinvproducts : Array<Noinvproduct> = [];
  public NoinvproductsAffected : Array<Noinvproduct> = [];
  public Invproducts : Array<Invproduct> = [];
  public InvproductsBydemand : Array<Invproduct> = [];
  public products : Product[];
  public states : Demandstate[];
  public Prodstates : Demandstate[];
  public Deliverynoinvs : Array<Deliverynoinv> = [];
  public myArrInvproductsBydemand : Array<Invproduct> = [];
  public myArrNoinvproductsAffected : Array<Noinvproduct> = [];
  public display : boolean ;
  public vide:any
  currentProd: Affectationdemand;
  public fitredProd : Array<Productaffected> = [];
  public myArrfitredProd : Array<Productaffected> = [];

  constructor(private datePipe : DatePipe ,
              private productService : ProductService,
              private invproductService : InvproductService,private sharedService : SharedServiceService,private noinvproductService : NoinvproductService,
              private subcategService :SubcategoryService, 
              private affectationdemandService :AffectationdemandService, 
              private entitytableService :EntitytableService, 
              private productaffectedService :ProductaffectedService,
              private deliverynoinvService:DeliverynoinvService,private productstateService : ProductstateService,
              private demandstateservice:DemandstateService,
              private productstateservice:ProductstateService, private route : Router){};


  @ViewChild('myForm') form: NgForm;
  async ngOnInit(): Promise<void> {
    this.getCategories();
    this.getSubCategories();
    this.getProducts();
    this.getEntitytables();
    this.getProductsaffected();
    this.getNoinvProducts();
    this.getInvProducts();
    this.getDeliverynoinvs();
    this.getAffectedDemands();
    this.getStates();
    this.getProdStates();
    this.getInvProductBydemand();
    this.display=false ;
    
    if(this.sharedService.getaffectedDemandsByNumDemand()!=null){
      this.addedDemand = this.sharedService.getaffectedDemandsByNumDemand();
    this.Invproducts=this.sharedService.getmyArrInvproductsBydemand()
    


  
    }
    

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
  
  public async getaffectedProductsByNumDemand(){
    for(let i in this.affectedDemands){
        if(this.affectedDemands[i].numDemand==this.form.value.DemandDetails.numDemand){
          if(this.affectedDemands[i].affectedProducts.length!=null){
            for(let j in this.affectedDemands[i].affectedProducts){
              this.ProductsaffectedByNumDemand.push(this.affectedDemands[i].affectedProducts[j])
            }
        }
      }
    }

  }

  public async getNoinvproductsAffected(){
    await this.getaffectedProductsByNumDemand()
    await this.getNoinvProducts()
    for(let item3 of this.ProductsaffectedByNumDemand){
    for(let item of this.Noinvproducts){
        for(let item2 of item.productaffecteds){
          
            if(item3.id==item2.id){
              this.NoinvproductsAffected.push(item)
            }

          }
      }
    }
    var mySetNoinvproduct = new Set(this.NoinvproductsAffected);
    this.myArrNoinvproductsAffected = [...mySetNoinvproduct];

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

  

  public async getDeliverynoinvs(): Promise<any> {
    (this.deliverynoinvService.getDeliverynoinvs()).subscribe(
  (response: Deliverynoinv[]) => {
    this.Deliverynoinvs = response;
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
  );
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCategoryselected(selectedCat:any) {
    this.filtredSubcategories=[]
    for(let i in this.subcategories) {
      if (this.subcategories[i].categories.id== selectedCat && this.subcategories[i].inventory==false) {

        this.filtredSubcategories.push(this.subcategories[i]);

      }
      

    }
}

onCategoryselected2(selectedCat:any) {
  this.filtredSubcategories=[]
  for(let i in this.subcategories) {
    if (this.subcategories[i].categories.id== selectedCat && this.subcategories[i].inventory==true) {

      this.filtredSubcategories.push(this.subcategories[i]);

    }
    

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





changeOption(value){
  this.inv.id=value
  this.inv=this.getSubcategory(value)
}

onDesignationselected(selectedCat: any) {
  this.filtredProducts=[]
  for(let i in  this.products) {
    if (this.products[i].subcategory.id== selectedCat) {
      this.filtredProducts.push(this.products[i]);
      
    }
}
}

public getEntitytables(): void {
  this.entitytableService.getEntitytables().subscribe(
    (response: Entitytable[]) => {
      this.entitytables = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public getEntitytableById(id : number): Entitytable {
  for(let i in this.entitytables){
    if(this.entitytables[i].id == id)  {
      return this.entitytables[i] ;
    }
  }
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

public async getAffectedDemandsByNumdemand(): Promise<void> {
 for(let item of this.affectedDemands){
  if(item.numDemand==this.form.value.DemandDetails.numDemand){
    this.affectedDemandsByNumDemand.push(item)
  }

 }
}

public async getAffectedDemandsByNumdemand2(num:string): Promise<Affectationdemand> {
  
   await this.getAffectedDemands();
   await new Promise(f => setTimeout(f, 500));
  for(let item of this.affectedDemands){
   if(item.numDemand==num){
     return item
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

  public async getInvProductById(id : number): Promise<Invproduct> {
    for(let i in this.Invproducts){
      if(this.Invproducts[i].idProduct.id == id)  {
        return this.Invproducts[i] ;
      }
    }
  }


  public  async getInvProductBydemand(): Promise<any> {
    if(this.Invproducts.length!=0 ){
    for(let item of this.Invproducts){
      if(item.idDemandaffectation!=null && item.idDemandaffectation.numDemand == this.form.value.DemandDetails.numDemand)  {
        this.InvproductsBydemand.push(item) ;
      }
    }
    var mySet = new Set(this.InvproductsBydemand);
    this.myArrInvproductsBydemand = [...mySet];
  }
  }
  public async getStates(): Promise<void> {
    this.demandstateservice.getDemandstate().subscribe(
      (response: Demandstate[]) => {
        this.states = response;
        this.filtredStates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public async getProdStates(): Promise<void> {
    this.productstateservice.getProductstate().subscribe(
      (response: Productstate[]) => {
        this.Prodstates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public  async getDemandStateById(id : number): Promise<Demandstate> {
    for(let i in this.states){
      if(this.states[i].id == id)  {
        return this.states[i] ;
      }
    }
  }

  public  async getProductStateById(id : number): Promise<Productstate> {
    for(let i in this.Prodstates){
      if(this.Prodstates[i].id == id)  {
        return this.Prodstates[i] ;
      }
    }
  }
  public  async getNoinvProductById(id : number): Promise<Noinvproduct> {
    for(let i in this.Noinvproducts){
      if(this.Noinvproducts[i].idProduct.id == id)  {
        return this.Noinvproducts[i] ;
      }
    }
  }

  public  getNoinvProductByDesignation(Designation: string): Noinvproduct {
    for(let i in this.Noinvproducts){
      if(this.Noinvproducts[i].idProduct.designation == Designation)  {
        return this.Noinvproducts[i] ;
      }
    }
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


  public getProductaffectedById(id : number): Productaffected {
    for(let i in this.Productsaffected){
      if(this.Productsaffected[i].id == id)  {
        return this.Productsaffected[i] ;
      }
    }
  }

  public  async getDemandaffectedBynumDemand(NUMDemand : string): Promise<Affectationdemand> {
    for(let i in this.affectedDemands){
      if(this.affectedDemands[i].numDemand == NUMDemand)  {
        return this.affectedDemands[i] ;
      }
      
    }
  }

  


  saveAffectedDemand(affectedDemand : Affectationdemand) {
    this.errors = [];
    this.affectationdemandService.addAffectationdemand(affectedDemand)
      .subscribe(data => {
          var win_timer = setInterval(function() {
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
            clearInterval(win_timer);

          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }

  saveNoinvproduct(noinvproduct : Noinvproduct) {
    this.errors = [];
    this.noinvproductService.updateNoInvproduct(noinvproduct)
      .subscribe(data => {
          var win_timer = setInterval(function() {
            clearInterval(win_timer);

          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }

    async saveInvProduct(affectationdemand : Affectationdemand) {
      this.addedInvproduct.idDemandaffectation= affectationdemand ;
    this.errors = [];
    this.invproductService.addInvproduct(this.addedInvproduct)
      .subscribe(data => {
          var win_timer = setInterval(function() {
            clearInterval(win_timer);

          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
       
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



  async onSubmit(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}

    }
    await this.getStates();
    await this.getInvProductBydemand();
    await this.getAffectedDemands()
    await this.getAffectedDemandsByNumdemand()
    await this.getNoinvProducts();
    await this.getNoinvproductsAffected();
    await this.getaffectedProductsByNumDemand();


    for(let item of this.affectedDemands){
      
      
      if(item.numDemand==this.form.value.DemandDetails.numDemand){
        alert("Cette demande est déjà effectuer!")
    this.addedDemand=item
    this.addedDemand.dateAffectation=item.dateAffectation
    this.addedDemand.beneficiary=item.beneficiary
    this.addedDemand.idEntity=item.idEntity
    this.sharedService.setmyArrNoinvproductsAffected(this.myArrNoinvproductsAffected);
    this.sharedService.setaffectedDemandsByNumDemand(this.addedDemand);
    this.readonly = true;
    this.display=true ;
    await new Promise(f => setTimeout(f, 500));

    await this.getAffectedDemands
    this.currentProd = await this.getAffectedDemandsByNumdemand2(this.addedDemand.numDemand)
    await new Promise(f => setTimeout(f, 500));

    this.fitredProd=this.currentProd.affectedProducts;
    var mySetProdAff = new Set(this.fitredProd);
    this.myArrfitredProd = [...mySetProdAff];
    console.log(this.myArrfitredProd)
    return

    
      }


 }



    this.addedDemand.idEntity=this.getEntitytableById(this.form.value.DemandDetails.idEntity);
    this.addedDemand.demandstate=await this.getDemandStateById(1)
    
    this.saveAffectedDemand(this.addedDemand);
    await this.getAffectedDemands();
    await new Promise(f => setTimeout(f, 1000));
    this.readonly = true;
    this.display=true ;
    await this.getAffectedDemands
    this.currentProd = await this.getAffectedDemandsByNumdemand2(this.addedDemand.numDemand)
    await new Promise(f => setTimeout(f, 500));

    this.fitredProd=this.currentProd.affectedProducts;
    var mySetProdAff = new Set(this.fitredProd);
    this.myArrfitredProd = [...mySetProdAff];
    console.log(this.myArrfitredProd)

    
  }




  async onSubmitProductaffected(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}
    }
    
    await this.getAffectedDemands();
    await this.getProductsaffected();
    this.test=true
    var i=0
    

    if(this.inv.inventory){
    await this.getAffectedDemands();
    await this.getProductsaffected();
    await this.getInvProducts();
    this.addedInvproduct= await this.getInvProductById(this.form.value.DemandDetails.designation);
    for(let item of this.Invproducts){
      
      
      if(item.idProduct.designation==this.addedInvproduct.idProduct.designation  && item.idProductState.id==1 && i!=this.Invproducts.length){
        
        this.addedInvproduct=item
        await new Promise(f => setTimeout(f, 500));
          this.addedInvproduct.idDemandaffectation= await this.getDemandaffectedBynumDemand(this.form.value.DemandDetails.numDemand);
          this.addedInvproduct.idProductState=await this.getProductState();
          this.Invproducts.push(this.addedInvproduct);
          await new Promise(f => setTimeout(f, 1000));
          this.addedInvproduct.idDemandaffectation= await this.getDemandaffectedBynumDemand(this.form.value.DemandDetails.numDemand);
          this.addedInvproduct.observationSortie=this.form.value.DemandDetails.observation
          await new Promise(f => setTimeout(f, 1000));
          if(this.addedInvproduct.idDemandaffectation !=undefined){
                this.saveInvProduct(this.addedInvproduct.idDemandaffectation);
                this.myArrInvproductsBydemand.push(this.addedInvproduct)
                this.Invproducts.push(this.addedInvproduct)
                break;
          }else{
                this.saveInvProduct(this.Invproducts[(await this.getInvProductById(this.form.value.DemandDetails.designation)).id-1].idDemandaffectation);
                this.myArrInvproductsBydemand.push(this.addedInvproduct)
                this.Invproducts.push(this.addedInvproduct)
                break;
              }
            
      }
      i++
      
    }
    
    if(i==this.Invproducts.length){
      alert("le produit est déjà affecté ou détruit")
      return;
    }

      
      
    }if(this.inv.inventory==false){
      await this.getAffectedDemands()
      await this.getProductsaffected();
      await this.getNoinvProducts();
      await this.getaffectedProductsByNumDemand();
      await this.getDemandaffectedBynumDemand(this.form.value.DemandDetails.numDemand);
      this.addedProductaffected.quantityRequested=this.form.value.DemandDetails.quantityRequested
      this.addedProductaffected.observation=this.form.value.DemandDetails.observation
      this.addedProductaffected.idAffectationdemand= await this.getDemandaffectedBynumDemand(this.form.value.DemandDetails.numDemand);
      this.addedProductaffected.noinvdesignation=  (await this.getNoinvProductById(this.form.value.DemandDetails.designation)).idProduct.designation
      this.addedProductaffected.idProductaffectednv=  await this.getNoinvProductById(this.form.value.DemandDetails.designation)
      this.addedProductaffected.numDemand=this.form.value.DemandDetails.numDemand;
      
      await this.getAffectedDemandsByNumdemand()
      await this.getAffectedDemandsByNumdemand()
      await this.getProductsaffected()
     
      this.saveProductaffected(this.addedProductaffected);
      await new Promise(f => setTimeout(f, 1000));
      
        this.sharedService.setmyArrNoinvproductsAffected(this.myArrNoinvproductsAffected)
      await this.getNoinvProducts()
      this.sharedService.setNoinvproducts(this.Noinvproducts);
      this.sharedService.setaffectedDemandsByNumDemand(this.addedDemand);
      for(let i in this.Productsaffected){
        this.Productsaffected[i].idProductaffectednv=  this.getNoinvProductBydesignation( this.Productsaffected[i].noinvdesignation);
        this.Productsaffected[i].idAffectationdemand=await this.getDemandaffectedBynumDemand(this.Productsaffected[i].numDemand)
        this.saveProductaffected(this.Productsaffected[i])
        this.getProductsaffected()
        
      }

      this.currentProd = await this.getAffectedDemandsByNumdemand2(this.addedDemand.numDemand)
      this.fitredProd=this.currentProd.affectedProducts;
      var mySetProdAff = new Set(this.fitredProd);
      this.myArrfitredProd = [...mySetProdAff];
      console.log(this.myArrfitredProd)
      
      
    }
    await this.getInvProducts();
    console.log('newInvProduct',this.Invproducts);
    
  }
  async getProductStates(){
    ( this.productstateService.getProductstate()).subscribe(
  (response: State[]) => {
    this.productsState= response;
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
  );
  }
  async getProductState(){
    await this.getProductStates();
    await new Promise(f => setTimeout(f, 500));
    
    for (let i in this.productsState) {
      if (this.productsState[i].id === 2) {
    
        return this.productsState[i];
        
      }else{
        console.log('false',this.productsState[i].id);
        
      }
    }
    
    }

    public  getIDaffectationDemandById(id : number): Affectationdemand{
      this.getProductsaffected()
      for(let i in this.Productsaffected){
        
        if(this.Productsaffected[i].id === id)  {
          return this.Productsaffected[i].idAffectationdemand ;
         
          
        }else{console.log('false',this.Productsaffected[i]);
      }
      }
    }
   
  Enregister(){
    if(this.form.invalid) {
      if(confirm('Données manquantes!')) {
        return;}

    }
    
    this.sharedService.setProductaffecteds(this.addedProductaffected);
    this.sharedService.setmyArrInvproductsBydemand(this.myArrInvproductsBydemand);
    this.sharedService.setmyArrNoinvproductsAffected(this.myArrNoinvproductsAffected);
    this.sharedService.setaffectedDemandsByNumDemand(this.addedDemand);
    this.sharedService.setNoinvproducts(this.Noinvproducts);

    if(this.test==true){
      alert("la demande a été bien enregistrer")
      window.location.reload();
    }else{
      this.route.navigate(['/exitRequestDetailsComponent']);
    }

  }


}