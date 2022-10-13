import { Affectationdemand } from "./affectationdemand.model"
import { Employee } from "./employee.model"
import { EntryDeliveryReceipt } from "./entry-delivery-receipt.model"
import { Product } from "./product.model"
import { Productstate } from "./productstate.model"

export class Invproduct {
    id:number
    idProduct?:Product
    numinv?:number
    numserie?:number
    idDelivery?:EntryDeliveryReceipt
    idProductState?:Productstate
    idDemandaffectation?:Affectationdemand
    idEmploye?:Employee
    observation?:string
    observationSortie?:string
    quantity:number=1
}
