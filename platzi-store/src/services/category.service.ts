import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  private categories = [
    {
      id: 1,
      name: 'Category 1',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      name: 'Category 2',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 3,
      name: 'Category 3',
      image: 'https://example.com/image3.jpg',
    },
    {
      id: 4,
      name: 'Category 4',
      image: 'https://example.com/image4.jpg',
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((category) => category.id === id);
  }

  create(category: CreateCategoryDto) {
    const newCategory = { ...category, id: this.categories.length + 1 };
    this.categories.push(newCategory);
    return newCategory;
  }
  update(id: number, category: CreateCategoryDto) {
    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index === -1) {
      return null;
    }
    this.categories[index] = { ...this.categories[index], ...category };
    return this.categories[index];
  }
  delete(id: number) {
    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index === -1) {
      return null;
    }
    const deletedCategory = this.categories[index];
    this.categories.splice(index, 1);
    return deletedCategory;
  }

  findById(id: number) {
    return this.categories.find((category) => category.id === id);
  }
  findByName(name: string) {
    return this.categories.find((category) => category.name === name);
  }
}
