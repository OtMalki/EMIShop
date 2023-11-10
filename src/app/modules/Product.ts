export class Product {


    id: number;

    title: string;

    price: number;

    description : string;

    category: string;

    images: string[];


    constructor(
        id: number,
        title: string,
        price: number,
        category: string,
        images: string[],
        description : string
    ) {
        this.id = id
        this.title = title
        this.price = price
        this.category = category
        this.images = images
        this.description = description
    }


}
