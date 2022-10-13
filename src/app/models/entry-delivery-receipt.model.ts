import { Deliverynoinv } from "./deliverynoinv.model"
import { EntryDemand } from "./entry-demand.model"

export class EntryDeliveryReceipt {

    id:number
    numDeliveryReceipt:number
    vendor:number
    idInvproduct:number
    dateDelivery:Date
    idRequest?: EntryDemand
    idDeliverynoinv?:Array<Deliverynoinv>
    //deliverynoinvs:

}
