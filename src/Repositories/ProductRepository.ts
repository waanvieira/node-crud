import { Repository } from "../../node_modules/typeorm/index";
import AppDataSource from "../database/connection";
import { Product } from "../entities/Product";

export default new class productRepository {

    private repository: Repository<Product>

    constructor() {
        this.repository = AppDataSource.getRepository(Product)
    }

    async getAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async store(product: Product): Promise<Product> {
        const productDb = await this.repository.save(product);
        return productDb;
    }

    async findById(id: string): Promise<Product|null> {
        const product = await this.repository.findOneBy({id: id});
        return product;
    }

    async update(product: Product): Promise<Product> {
        const productDb = await this.repository.save(product);
        return productDb;
    }

    delete(id: string): void {
        this.repository.delete({ id: id });
    }
    // await this.productRepository.delete({ id: productId });
}