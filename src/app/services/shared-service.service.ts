import { Injectable } from '@angular/core';
import {EntryDemand} from "../models/entry-demand.model";
import {EntryDeliveryReceipt} from "../models/entry-delivery-receipt.model";
import { Affectationdemand } from '../models/affectationdemand.model';
import { Product } from '../models/product.model';
import { Noinvproduct } from '../models/noinvproduct.model';
import { Invproduct } from '../models/invproduct.model';
import { Productaffected } from '../models/productaffected.model';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  message : EntryDemand
  receipt : EntryDeliveryReceipt


  message2 : Noinvproduct[]
  message3 : Invproduct[]
  Invproducts : Invproduct

  affectedDemandsByNumDemand:Affectationdemand
  Productaffected:Productaffected
  TabProductaffected:Array<Productaffected> =[]
  public Noinvproducts : Array<Noinvproduct> = [];


  constructor() { }
  setMessage(data: EntryDemand){
    this.message=data;
  }
  getMessage(){
    return this.message
  }
  setReceipt(data: EntryDeliveryReceipt){
    this.receipt=data;
  }
  getReceipt(){
    return this.receipt
  }

  setmyArrNoinvproductsAffected(data: Noinvproduct[]){
    this.message2=data;
  }
  getmyArrNoinvproductsAffected(){
    return this.message2
  }

  setmyArrInvproductsBydemand(data: Invproduct[]){
    this.message3=data;
  }
  getmyArrInvproductsBydemand(){
    return this.message3
  }

  setmyArrInvproducts(data: Invproduct){
    this.Invproducts=data;
  }
  getmyArrInvproducts(){
    return this.Invproducts
  }

  setaffectedDemandsByNumDemand(data: Affectationdemand){
    this.affectedDemandsByNumDemand=data;
  }
  getaffectedDemandsByNumDemand(){
    return this.affectedDemandsByNumDemand
  }

  setNoinvproducts(data: Noinvproduct[]){
    this.Noinvproducts=data;
  }
  getNoinvproducts(){
    return this.Noinvproducts
  }

  setProductaffecteds(data: Productaffected){
    this.Productaffected=data;
  }
  getProductaffecteds(){
    return this.Productaffected
  }

  setTabProductaffected(data: Productaffected[]){
    this.TabProductaffected=data;
  }
  getTabProductaffected(){
    return this.TabProductaffected
  }
}