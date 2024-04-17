import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersService } from '../services/orders.service';
import { Order } from '../entities/order.entity';
import { OrderDto } from '../dtos/order.dto';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { OrderItem } from '../entities/orderItem.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;

  const getEmptyUser = (): User => {
    const role = new Role('test');

    return new User('test', 'test', 'test', 'address', '121', role);
  };

  const getEmptyOrderItem = (): OrderItem => {
    return new OrderItem(1, 20, 20, 0, null);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a order', () => {
      const orderDto: OrderDto = {
        id: '1',
        totalPrice: 100,
        discount: 0,
        userId: '1',
        orderItems: ['1'],
      };

      const createdOrder: Order = new Order(100, 0, getEmptyUser(), [
        getEmptyOrderItem(),
      ]);

      jest.spyOn(repository, 'create').mockReturnValue(createdOrder);

      expect(service.create(orderDto)).toEqual(createdOrder);
      expect(repository.create).toHaveBeenCalledWith(orderDto);
    });

    it('should log and rethrow error if repository throws an error', () => {
      const orderDto: OrderDto = {
        id: '1',
        totalPrice: 100,
        discount: 0,
        userId: '1',
        orderItems: ['1'],
      };

      const error = new Error('Some error message');
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw error;
      });

      const loggerSpy = jest.spyOn(service['logger'], 'log');
      expect(() => service.create(orderDto)).toThrow(error);
      expect(loggerSpy).toHaveBeenCalledWith(
        `OrdersService:create: ${JSON.stringify(error.message)}`,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const products: Order[] = [
        new Order(200, 0, getEmptyUser(), [getEmptyOrderItem()]),
        new Order(100, 0, getEmptyUser(), [getEmptyOrderItem()]),
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(products);

      expect(await service.findAll()).toEqual(products);
    });

    it('should throw an error if no orders are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow('No record found.');
    });
  });

  describe('findOne', () => {
    it('should return a order if found', async () => {
      const orderId = '1';
      const order: Order = new Order(100, 0, getEmptyUser(), [
        getEmptyOrderItem(),
      ]);

      jest.spyOn(repository, 'findOne').mockResolvedValue(order);

      expect(await service.findOne(orderId)).toEqual(order);
    });

    it('should throw an error if order is not found', async () => {
      const productId = '1';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(productId)).rejects.toThrow(
        'Order not found.',
      );
    });
  });

  describe('update', () => {
    it('should update a order', async () => {
      const orderId = '1';
      const orderDto: OrderDto = {
        id: '1',
        totalPrice: 200,
        discount: 0,
        userId: '1',
        orderItems: ['1'],
      };

      const existingOrder: Order = new Order(100, 0, getEmptyUser(), [
        getEmptyOrderItem(),
      ]);

      jest.spyOn(service, 'findOne').mockResolvedValue(existingOrder);

      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce({ affected: 1 } as UpdateResult);

      await expect(service.update(orderId, orderDto)).resolves.toEqual({
        affected: 1,
        raw: undefined,
      });

      expect(repository.update).toHaveBeenCalledWith(orderId, orderDto);
    });

    it('should throw an error if order is not found during update', async () => {
      const orderId = '1';
      const orderDto: OrderDto = {
        id: '1',
        totalPrice: 200,
        discount: 0,
        userId: '1',
        orderItems: ['1'],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(orderId, orderDto)).rejects.toThrow(
        'Order not found.',
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const productId = '1';

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValueOnce({ affected: 1 } as DeleteResult);

      await expect(service.remove(productId)).resolves.toEqual({ affected: 1 });
      expect(repository.delete).toHaveBeenCalledWith(productId);
    });
  });
});
