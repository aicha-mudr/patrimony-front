import { Demandstate } from "./demandstate.model"
import { Entitytable } from "./entitytable.model"
import { Invproduct } from "./invproduct.model"
import { Productaffected } from "./productaffected.model"


export class Affectationdemand {
    id:number
    numDemand:string
    dateAffectation:Date
    demandstate:Demandstate
    idEntity:Entitytable
    //idProductaffected:Productaffected
    docDemandAffectation:string
    docBonAffectation:string
    dateReceiptAffectation:Date
    beneficiary:string
    idProductaffectedInv:Invproduct
    affectedProducts:Array<Productaffected>
    signDate:Date
    dateBonSortie:Date
    numBonSortie:string
    
}
