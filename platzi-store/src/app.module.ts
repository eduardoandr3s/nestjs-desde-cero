import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { BrandService } from './services/brand.service';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController],
  providers: [
    AppService,
    ProductService,
    UserService,
    CategoryService,
    BrandService,
    CustomerService,
  ],
})
export class AppModule {}
