import { EntryDeliveryReceipt } from "./entry-delivery-receipt.model"
import { Noinvproduct } from "./noinvproduct.model"

export class Deliverynoinv {
    id:number
    quantity:number
    idProductnv:Noinvproduct
    idEntrydeliveryreceipt:EntryDeliveryReceipt
    observation:string
}
