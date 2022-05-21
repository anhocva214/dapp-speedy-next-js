export class Product{
    name: string;
    imageUrl: string;
    price: number;
    constructor()
    constructor(obj?: Product)
    constructor(obj?: any){
        this.name = obj?.name || '';
        this.imageUrl = obj?.imageUrl || ''
        this.price = obj?.price || ''
    }
}

export class ProductInCart extends Product{
    amount: number;
    constructor(obj?: ProductInCart)
    constructor(obj?: any){
        super(obj);
        this.amount = obj?.amount || 1;
    }
}