import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      stock: 20,
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      stock: 30,
      image: 'https://example.com/image3.jpg',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      stock: 40,
      image: 'https://example.com/image4.jpg',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(product: CreateProductDto) {
    console.log('Creating product:', product);
    const newProduct = { ...product, id: this.products.length + 1 };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: UpdateProductDto): UpdateProductDto {
    const index = this.products.findIndex((p) => p.id === +id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
