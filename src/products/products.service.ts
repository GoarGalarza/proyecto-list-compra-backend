import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);    
  }

  // Obtener todos (SELECT * FROM products)
  async findAll() {
    return await this.productRepository.find();
  }

  // Obtener uno por ID (SELECT * FROM products WHERE id = X)
  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return product;
  }

  // Actualizar (UPDATE products SET ... WHERE id = X)
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id); // Verificamos que existe
    const updated = Object.assign(product, updateProductDto);
    return await this.productRepository.save(updated);
  }

  // Eliminar (DELETE FROM products WHERE id = X)
  async remove(id: number) {
    const product = await this.findOne(id); // Verificamos que existe
    return await this.productRepository.remove(product);
  }
}
