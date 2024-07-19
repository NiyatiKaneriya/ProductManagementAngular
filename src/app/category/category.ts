import { Products } from "../product/product";

export class Category {
    categoryId: number;
    categoryName: string;
    sequence: number;
    totalProducts: number;
    catProducts : Products[];
    
    constructor() {
        this.categoryId = 0,
        this.categoryName = '',
        this.sequence = 0,
        this.totalProducts = 0
        this.catProducts = [];
    }
    
}