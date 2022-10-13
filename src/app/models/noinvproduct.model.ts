import { Product } from "./product.model"
import { Productaffected } from "./productaffected.model"

export class Noinvproduct {

    id:number
    idProduct:Product
    quantityStock:number
    productaffecteds:Array<Productaffected>
}
