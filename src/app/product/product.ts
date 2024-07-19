export class Products {

    productId: number;
    productName: string;
    price: number;
    supplierName: string;
    categoryId: number;
    category: string;
    supplierEmail: string;
    supplierPhoneNo: number;
    productDescription: string;
    availableFrom: Date | string | null;
    productWebsite: string;
    isActive: boolean;
    availableAt: string;
    availableAtcity: number[];
    availableAtcityList: string;
    filePath: string | null;
    productImage: File | null;

    constructor() {
        this.productId = 0,
        this.productName = '',
        this.price = 0,
        this.supplierName = ''
        this.categoryId = 0;
        this.category = '';
        this.supplierEmail = '';
        this.supplierPhoneNo = 0;
        this.productDescription = '';
        this.availableFrom = new Date();
        this.productWebsite = '';
        this.isActive = true;
        this.availableAt = '';
        this.availableAtcity = [];
        this.availableAtcityList = '';
        this.filePath = null;
        this.productImage = null;
    }
}