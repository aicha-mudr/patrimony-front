import { Component, OnInit } from '@angular/core';
import {EntryDemand} from "../../models/entry-demand.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EntryDeliveryService} from "../../services/entry-delivery.service";
import {EntryDeliveryReceipt} from "../../models/entry-delivery-receipt.model";
import {SharedServiceService} from "../../services/shared-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entry-management',
  templateUrl: './entry-management.component.html',
  styleUrls: ['./entry-management.component.scss']
})
export class EntryManagementComponent implements OnInit {
  public EntryDemands : Array<EntryDemand> = [];
  public EntryDeliveryReceipts : Array<EntryDeliveryReceipt> = [];
  p:number=1;

  
  constructor(private http: HttpClient , private entryDeliveryService : EntryDeliveryService ,private sharedService : SharedServiceService , private route : Router) { }

  ngOnInit(): void {
    this.getEntryDemands();
    this.getDeliveryReceipts();
  }
  fileName = '';
  key:string ="id";
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse
  }

    onFileSelected(event) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
        }
    }
  public async getEntryDemands(): Promise<any> {
    (await this.entryDeliveryService.getEntryDemands()).subscribe(
      (response: EntryDemand[]) => {
        this.EntryDemands = response;
        //console.log(this.EntryDemands);
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
        //console.log(this.EntryDemands);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getReceipt(entry) {
    for(let i in this.EntryDeliveryReceipts) {
      if (this.EntryDeliveryReceipts[i].idRequest.id== entry.id) {
        console.log('hadi',true);
        return this.EntryDeliveryReceipts[i];
      }
    }
  }
  editEntry(entry: EntryDemand) {
    let sentReceipt = this.getReceipt(entry);
    this.sharedService.setReceipt(sentReceipt);
    this.route.navigate(['/validateEntryReceipt']);

  }
  public async next(entry: EntryDemand) {
    
    console.log('next');
    let sentReceipt = this.getReceipt(entry);
    this.sharedService.setReceipt(sentReceipt);
    
    this.route.navigate(['/entrydetails']);
  }
}
