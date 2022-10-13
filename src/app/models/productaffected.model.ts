import { Affectationdemand } from "./affectationdemand.model"
import { Noinvproduct } from "./noinvproduct.model"

export class Productaffected {
    id:number
    idProductaffectednv?:Noinvproduct
    quantityRequested?:number
    quantityGaranted?:number
    observation?:string
    idAffectationdemand?:Affectationdemand
    noinvdesignation?:string
    numDemand?:string
}
