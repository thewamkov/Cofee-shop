import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemDto } from 'src/dtos/orderItem.dto';
import { OrderItemsService } from 'src/services/orderItem.service';

@Controller('orderItems')
export class OrderItemsController {
  constructor(private readonly _orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createUserDto: OrderItemDto) {
    return this._orderItemsService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this._orderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._orderItemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: OrderItemDto) {
    return this._orderItemsService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._orderItemsService.remove(id);
  }
}
