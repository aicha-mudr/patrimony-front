import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SharedServiceService} from "../../services/shared-service.service";
import {EntryDeliveryReceipt} from "../../models/entry-delivery-receipt.model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {EntryDeliveryService} from "../../services/entry-delivery.service";
import { Deliverynoinv } from 'src/app/models/deliverynoinv.model';
import { DeliverynoinvService } from 'src/app/services/deliverynoinv.service';
import { Invproduct } from 'src/app/models/invproduct.model';
import { InvproductService } from 'src/app/services/invproduct.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss']
})
export class EntryDetailsComponent implements OnInit {
  @ViewChild('content3',{static:false}) el!:ElementRef;

  
  receivedReceipt : EntryDeliveryReceipt;
  EntryDeliveryReceipts: Array<EntryDeliveryReceipt> = [];
  FiltredDeliveryReceipts: Array<EntryDeliveryReceipt> = [];
  Deliverynoinvs: Array<Deliverynoinv> = [];
  fitredNoinv: Array<Deliverynoinv> = [];
  filtredInvproducts: Array<Invproduct> = [];
  Invproducts: Array<Invproduct> = [];


  exist : Boolean = false;


  constructor(private sharedService : SharedServiceService ,private invproductService : InvproductService, private deliverynoinvService : DeliverynoinvService ,private route : Router ,private entryDeliveryService :EntryDeliveryService ) { }

  ngOnInit(): void {
    this.receivedReceipt = this.sharedService.getReceipt();
    console.log('receive : ',this.receivedReceipt);
    this.getDeliveryReceipts();
    this.getDeliverynoinvs();
    this.getInvProducts();
  }

  makePDF(){
    let pdf=new jsPDF('p', 'pt', [1200,1200]);
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("BonSortie.pdf");
      }
    })
  }


  onSubmit() {
    this.sharedService.setMessage(this.receivedReceipt.idRequest);
    this.route.navigate(['/addEntryReceipt']);

  }
  public async getDeliveryReceipts(): Promise<any> {
    (await this.entryDeliveryService.getEntryDeliveryReceipts()).subscribe(
       (response: EntryDeliveryReceipt[]) => {
        this.EntryDeliveryReceipts = response;
        console.log('initial:', this.EntryDeliveryReceipts);
         for (let i in this.EntryDeliveryReceipts) {
           if ((this.EntryDeliveryReceipts[i].id == this.receivedReceipt.id)) {
             this.exist = true;
           }
         }if(!this.exist){this.EntryDeliveryReceipts.push(this.receivedReceipt);}


         for (let i in this.EntryDeliveryReceipts) {
          if (this.EntryDeliveryReceipts[i].idRequest.id == this.receivedReceipt.idRequest.id) {
            console.log('hadi', true);
            this.FiltredDeliveryReceipts.push(this.EntryDeliveryReceipts[i]);
          }
        }


           console.log('filtred list: ', this.FiltredDeliveryReceipts);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }


    );

  }
  public  filterDeliveryReceipts():any {


      this.EntryDeliveryReceipts.push(this.receivedReceipt);
    console.log('NOTfiltred list: ',this.EntryDeliveryReceipts)

    for (let i in this.EntryDeliveryReceipts) {
      if (this.EntryDeliveryReceipts[i].idRequest.id == this.receivedReceipt.idRequest.id ) {
        console.log('hadi', true);
        this.FiltredDeliveryReceipts.push(this.EntryDeliveryReceipts[i]);
      }
    }
    console.log('filtred list: ',this.FiltredDeliveryReceipts)
  }
  
  public async getDeliverynoinvs(): Promise<any> {
    (await this.deliverynoinvService.getDeliverynoinvs()).subscribe(
  (response: Deliverynoinv[]) => {
    this.Deliverynoinvs = response;
    //console.log(this.EntryDemands);
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
  await new Promise(f => setTimeout(f, 1000));

  console.log('all InvProducts : ', this.Invproducts);
  
  }

}
