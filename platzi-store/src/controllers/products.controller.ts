import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  // ParseIntPipe,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ProductService } from 'src/services/product.service';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `Product limit ${limit}, offset ${offset} and brand ${brand}`,
    // };
    return this.productService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    // response.status(200).send({
    //   message: `Product ${id}`,
    // });
    const product = this.productService.findOne(id);
    if (!product) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Product ${id} not found`,
      };
    }
    return {
      message: `Product ${id}`,
      statusCode: HttpStatus.OK,
      product,
    };
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    // return {
    //   message: 'Creating a product',
    //   payload,
    // };
    return {
      result: this.productService.create(product),
      statusCode: HttpStatus.CREATED,
      message: 'Product created',
      product,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    // return {
    //   message: `Updating a product ${id}`,
    //   payload,
    // };
    const productUpdate = this.productService.update(id, product);
    if (!productUpdate) {
      return {
        message: `Product ${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
      };
    }
    return {
      message: `Product ${id} updated`,
      productUpdate,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const product = this.productService.delete(id);
    const perro : string;
    if (!product) {
      return {
        message: `Product ${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
      };
    }
    return {
      message: `Product ${id} deleted`,
      statusCode: HttpStatus.OK,
      product,
    };
  }
}
