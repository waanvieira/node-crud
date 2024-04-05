import 'module-alias/register'
import { Request, Response } from "express";
import AppDataSource from "@/database/connection";
import { Product } from "@/entities/Product";
import ProductRepository from "@/Repositories/ProductRepository";
import { validate } from "../../node_modules/class-validator";

// Exportamos com default para que possamos recuperar como ProductController no server e também instanciamos a classe
// para recuperar já instanciado no nosso server
export default new class ProductController {

    private productRepository;

    constructor() {
        this.productRepository = ProductRepository;
    }

    // temos que usar o async passando como função assíncrona porque temos que ir no banco buscar essas informações
    // então pode demorar um pouco
    findAll = async (request: Request, response: Response) => {
        // Para usar o this não pode ser função name() {} tem que ser uma arrow function
        const products = await this.productRepository.getAll();
        return response.status(200).send({
            data: products
        });
    }

    store = async (request: Request, response: Response) => {
        try {
            // destruction que podemos pegar apenas os valores especificos e referenciarmos em variaveis
            const { name, description, price } = request.body
            const product = new Product;
            product.name = name;
            product.description = description;
            product.price = price;

            const errors = await validate(product);
            console.log(errors.length)
            if (errors.length > 0 ) {
                return response.status(422).json(errors);
            }

            const productDb = await this.productRepository.store(product);
            return response.status(201).json({
                data: productDb
            });
        } catch (error) {
            return response.status(500).json({ msg: error });
        }
    }

    findById = async (request: Request, response: Response) => {
        let productId = request.params.id
        // const product = await this.productRepository.findOneBy({ id: productId });
        const product = await this.productRepository.findById(productId);
        if (!product) {
            return response.status(404).json({
                message: 'registro não encontrado'
            });
        }

        return response.status(200).send({
            data: product
        });
    }

    update = async (request: Request, response: Response) => {
        let productId = request.params.id
        const { name, description, price } = request.body
        
        // No update temos que usar a variável como let porque vamos alterar o objeto com os dados vindo da request
        const product = await this.productRepository.findById(productId);

        if (!product) {
            return response.status(404).json({
                message: 'registro não encontrado'
            });
        }

        product.name = name;
        product.description = description;
        product.price = price;

        const errors = await validate(product);
        console.log(errors.length)
        if (errors.length > 0 ) {
            return response.status(422).json(errors);
        }

        const productDb = this.productRepository.update(product);
        return response.status(200).send({
            message: productDb
        });
    }

    destroy = async (request: Request, response: Response) => {
        let productId = request.params.id
        const product = await this.productRepository.findById(productId);
        if (!product) {
            return response.status(404).json({
                message: 'registro não encontrado'
            });
        }

        this.productRepository.delete(productId);
        response.status(204).json();
    }

    // Informamos que é uma promessa e pode retornar ou product ou null, seria mais fácil e mais performático 
    // Um repositório retornando uma exception no lugar desse Product ou null
    // Como é uma função que já esta sendo chamada com async wait não precisamos declarar aqui
    // findOrFail = (id: string) => {
    //     let product = this.productRepository.findOneBy({ id });
    //     if (!product) {
    //         return null
    //     }

    //     return product;
    // }
}

// export {}