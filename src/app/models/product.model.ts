import {CategoryManagement} from "./category-management.model";
import {SubCategoryComponent} from "../components/sub-category/sub-category.component";
import {Subcategory} from "./subcategory.model";

export class Product {
  id: number
  codeProduct: string
  designation: string
  minQuantity :number
  subcategory? : Subcategory
}
