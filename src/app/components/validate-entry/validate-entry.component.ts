import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from "../../services/shared-service.service";
import {EntryDeliveryReceipt} from "../../models/entry-delivery-receipt.model";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {EntryDeliveryService} from "../../services/entry-delivery.service";
import { Deliverynoinv } from 'src/app/models/deliverynoinv.model';
import { DeliverynoinvService } from 'src/app/services/deliverynoinv.service';
import { Invproduct } from 'src/app/models/invproduct.model';
import { InvproductService } from 'src/app/services/invproduct.service';
import { EntryStateServiceService } from 'src/app/services/entry-state-service.service';
import { State } from 'src/app/models/state.model';
import { EntryDemand } from 'src/app/models/entry-demand.model';
import { EntryDemandService } from 'src/app/services/entry-demand.service';
import { finalize, Subscription } from 'rxjs';
import { Input } from '@angular/core';

@Component({
  selector: 'app-validate-entry',
  templateUrl: './validate-entry.component.html',
  styleUrls: ['./validate-entry.component.scss']
})
export class ValidateEntryComponent implements OnInit {
  receivedReceipt : EntryDeliveryReceipt;
  EntryDeliveryReceipts: Array<EntryDeliveryReceipt> = [];
  FiltredDeliveryReceipts: Array<EntryDeliveryReceipt> = [];
  Deliverynoinvs: Array<Deliverynoinv> = [];
  fitredNoinv: Array<Deliverynoinv> = [];
  filtredInvproducts: Array<Invproduct> = [];
  Invproducts: Array<Invproduct> = [];
  public EntryStates : Array<State> = [];
  public EntryDemands : Array<EntryDemand> = [];
  public addedEntryDemand : EntryDemand= new EntryDemand();

  exist : Boolean = false;
  myState: State;
  errors: any[];
  t: any;
  afuConfig = {
    uploadAPI: {
      url:"https://slack.com/api/files.upload"
    }
};
@Input()
requiredFileType:string;

fileName = '';
uploadProgress:number;
uploadSub: Subscription;



  constructor(private http: HttpClient , private sharedService : SharedServiceService ,private entryDemandService : EntryDemandService, private router : Router , private stateService : EntryStateServiceService,private invproductService : InvproductService, private deliverynoinvService : DeliverynoinvService ,private route : Router ,private entryDeliveryService :EntryDeliveryService ) { }

  ngOnInit(): void {
    this.addedEntryDemand = this.sharedService.getMessage();
    console.log('receive : ' + this.sharedService.getMessage());
    this.receivedReceipt = this.sharedService.getReceipt();
    console.log('receive : ',this.receivedReceipt);
    this.getDeliveryReceipts();
    this.getDeliverynoinvs();
    this.getInvProducts(); 
    this.getEntryDemands();
  }

onFileSelected(event) {
    const file:File = event.target.files[0];
  
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );
      
        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
    }
}

cancelUpload() {
this.uploadSub.unsubscribe();
this.reset();
}

reset() {
this.uploadProgress = null;
this.uploadSub = null;
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
  async getStates(){
    (await this.stateService.getEntryStates()).subscribe(
  (response: State[]) => {
    this.EntryStates= response;
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
  );
  }
  async getState(){
    await this.getStates();
    await new Promise(f => setTimeout(f, 500));
    
    console.log('states',this.EntryStates)
    for (let i in this.EntryStates) {
      if (this.EntryStates[i].id === 3) {
        console.log('mystate',this.EntryStates[i]);
    
        this.myState= this.EntryStates[i];
        
      }else{
        console.log('false',this.EntryStates[i].id);
        
      }
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
    public getEntryDemand(numDepense : string): EntryDemand {
      for (let i in this.EntryDemands) {
        if (this.EntryDemands[i].numDepense == numDepense) {
          return this.EntryDemands[i];
        }
      }
      
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
    
  public async next() {
    await this.getState();
    let updatedEntry =await this.getEntryDemand(this.addedEntryDemand.numDepense);
    console.log('state check',updatedEntry);
    updatedEntry.state=this.myState;
    this.saveEntryDemand(updatedEntry);
    console.log('next');
    this.sharedService.setReceipt(this.receivedReceipt);
    
    this.router.navigate(['/entrydetails']);
  }
  
}
