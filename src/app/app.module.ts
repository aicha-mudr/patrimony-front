import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';


import { MaterialModule } from '../material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { AddSubcategoryComponent } from './components/add-subcategory/add-subcategory.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AddEntryDemandComponent } from './components/add-entry-demand/add-entry-demand.component';
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {AffectaionRequestComponent} from "./components/affectaion-request/affectaion-request.component";
import { AddEntryReceiptComponent } from './components/add-entry-receipt/add-entry-receipt.component';
import { DatePipe } from '@angular/common';
import { EntryManagementComponent } from './components/entry-management/entry-management.component';
import { ValidateEntryComponent } from './components/validate-entry/validate-entry.component';
import { AffectationdemandComponent } from './components/affectationdemand/affectationdemand.component';
import { ExitRequestDetailsComponent } from './components/exit-request-details/exit-request-details.component';
import { DetailsDemandAffectedComponent } from './components/details-demand-affected/details-demand-affected.component';
import { DetailDemandLivreeComponent } from './components/detail-demand-livree/detail-demand-livree.component';
import { AllDemandAffectationComponent } from './components/all-demand-affectation/all-demand-affectation.component';
import { DeliveryProductsComponent } from './components/delivery-products/delivery-products.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';
import { StockComponent } from './components/stock/stock.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    routingComponents,
    HeaderComponent,
    SubCategoryComponent,
    AddSubcategoryComponent,
    AddEntryDemandComponent,
    ProductAddComponent,
    AffectaionRequestComponent,
    AddEntryReceiptComponent,
    EntryManagementComponent,
    ValidateEntryComponent,
    AffectationdemandComponent,
    ExitRequestDetailsComponent,
    DetailsDemandAffectedComponent,
    DetailDemandLivreeComponent,
    AllDemandAffectationComponent,
    DeliveryProductsComponent,
    EntryDetailsComponent,
    StockComponent,
    AccueilComponent
  ],
  imports: [
    NgxPaginationModule,
    AngularFileUploaderModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    Ng2OrderModule
  ],
  providers: [CategoryService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
