import {
    attribute,
    autoGeneratedHashKey,
    table,
    rangeKey
} from '@aws/dynamodb-data-mapper-annotations';

/*
 * This class rappresent a product item in products table
 */
@table(process.env.PRODUCTS_TABLE)
class Product {
    @autoGeneratedHashKey()
    id: string;

    @rangeKey()
    version: Date;

    @attribute()
    name: string;

    @attribute()
    price: number;

    @attribute()
    description: string;

    @attribute()
    availability: number;

    @attribute()
    discount: number;

}

export default Product;