import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import {AddSubcategoryComponent} from "./components/add-subcategory/add-subcategory.component";
import { AddEntryDemandComponent } from './components/add-entry-demand/add-entry-demand.component';
import {AffectaionRequestComponent} from "./components/affectaion-request/affectaion-request.component";
import {EntryDeliveryReceipt} from "./models/entry-delivery-receipt.model";
import {AddEntryReceiptComponent} from "./components/add-entry-receipt/add-entry-receipt.component";
import {ValidateEntryComponent} from "./components/validate-entry/validate-entry.component";
import {EntryManagementComponent} from "./components/entry-management/entry-management.component";
import { AffectationdemandComponent } from './components/affectationdemand/affectationdemand.component';
import { ExitRequestDetailsComponent } from './components/exit-request-details/exit-request-details.component';
import { DetailsDemandAffectedComponent } from './components/details-demand-affected/details-demand-affected.component';
import { DetailDemandLivreeComponent } from './components/detail-demand-livree/detail-demand-livree.component';
import { AllDemandAffectationComponent } from './components/all-demand-affectation/all-demand-affectation.component';
import { DeliveryProductsComponent } from './components/delivery-products/delivery-products.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';
import { StockComponent } from './components/stock/stock.component';
import { AccueilComponent } from './components/accueil/accueil.component';
const routes: Routes = [
  {path: 'accueil' ,component:  AccueilComponent},
  {path: 'categoryManagement' ,component: CategoryManagementComponent},
  {path: 'productManagement' ,component:  ProductManagementComponent},
  {path: 'subcategory' ,component:  SubCategoryComponent},
  {path: 'addSubcategory' ,component:  AddSubcategoryComponent},
  {path: 'addEntryDemandComponent' ,component:  AddEntryDemandComponent},
  {path: 'affectationRequest' ,component:  AffectaionRequestComponent},
  {path: 'addEntryReceipt' ,component:  AddEntryReceiptComponent},
  {path: 'validateEntryReceipt' ,component:  ValidateEntryComponent},
  {path: 'AllEntryRequests' ,component:  EntryManagementComponent},
  {path: 'Affectationdemand' ,component:  AffectationdemandComponent},
  {path: 'exitRequestDetailsComponent' ,component:  ExitRequestDetailsComponent},
  {path: 'detailsDemandAffectedComponent' ,component:  DetailsDemandAffectedComponent},
  {path: 'detailDemandLivreeComponent' ,component:  DetailDemandLivreeComponent},
  {path: 'allDemandAffectationComponent' ,component:  AllDemandAffectationComponent},
  {path: 'addReceivedProducts' ,component:  DeliveryProductsComponent},
  {path: 'entrydetails' ,component:  EntryDetailsComponent},
  {path: 'stock' ,component:  StockComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AccueilComponent,CategoryManagementComponent , ProductManagementComponent 
  , SubCategoryComponent, AddEntryDemandComponent,AffectationdemandComponent,ExitRequestDetailsComponent,
  DetailsDemandAffectedComponent,DetailDemandLivreeComponent,StockComponent,EntryDetailsComponent,AllDemandAffectationComponent]