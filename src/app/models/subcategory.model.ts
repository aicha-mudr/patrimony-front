import { Product } from "./product.model"
import {CategoryManagement} from "./category-management.model";

export class Subcategory {
  id?:number
  subcategoryName?:string
  inventory?:boolean
  serie?:boolean
  categories? : CategoryManagement
  products?: Array<Product>



}
