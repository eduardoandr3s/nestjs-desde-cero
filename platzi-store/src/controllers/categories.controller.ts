import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateCategoryDto } from 'src/dtos/categories.dto';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    const category = this.categoryService.findOne(id);
    if (!category) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Category ${id} not found`,
      };
    }
    return {
      message: `Category ${id}`,
      statusCode: HttpStatus.OK,
      category,
    };
  }

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return {
      result: this.categoryService.create(category),
      statusCode: HttpStatus.CREATED,
      message: 'Creating a category',
      category,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: CreateCategoryDto,
  ) {
    const categoryUpdated = this.categoryService.update(id, category);
    if (!categoryUpdated) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Category ${id} not found`,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: `Category ${id} updated`,
      category: categoryUpdated,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const categoryDeleted = this.categoryService.delete(id);
    if (!categoryDeleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: `Category ${id} not found`,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: `Category ${id} deleted`,
      category: categoryDeleted,
    };
  }
}
