import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductDto } from 'src/dtos/product.dto';
import { ProductsService } from 'src/services/products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  @Post()
  create(@Body() createUserDto: ProductDto) {
    return this._productsService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this._productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: ProductDto) {
    return this._productsService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._productsService.remove(id);
  }
}
