import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DiscountsService } from '../services/discounts.service';
import { Discount } from '../entities/discount.entity';
import { DiscountDto } from 'src/dtos/discount.dto';

describe('DiscountsService', () => {
  let service: DiscountsService;
  let repository: Repository<Discount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscountsService,
        {
          provide: getRepositoryToken(Discount),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DiscountsService>(DiscountsService);
    repository = module.get<Repository<Discount>>(getRepositoryToken(Discount));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a discount', () => {
      const product: Product = new Product(
        '1',
        'Product 1',
        'Description of Product 1',
        10.99,
        100,
        null,
      );

      const discountDto: DiscountDto = {
        id: '1',
        productsId: ['1'],
        startDate: new Date(2024, 4, 10),
        endDate: new Date(2024, 4, 16),
      };

      const createdDiscount: Discount = new Discount(
        1,
        new Date(2024, 4, 10).toString(),
        new Date(2024, 4, 16).toString(),
        [product],
      );

      jest.spyOn(repository, 'create').mockReturnValue(createdDiscount);

      expect(service.create(discountDto)).toEqual(createdDiscount);
      expect(repository.create).toHaveBeenCalledWith(discountDto);
    });

    it('should log and rethrow error if repository throws an error', () => {
      const productDto: DiscountDto = {
        id: '1',
        productsId: ['1'],
        startDate: new Date(2024, 4, 10),
        endDate: new Date(2024, 4, 16),
      };

      const error = new Error('Some error message');
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw error;
      });

      const loggerSpy = jest.spyOn(service['logger'], 'log');
      expect(() => service.create(productDto)).toThrow(error);
      expect(loggerSpy).toHaveBeenCalledWith(
        `DiscountsService:create: ${JSON.stringify(error.message)}`,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of discounts', async () => {
      const discounts: Discount[] = [
        new Discount(
          1,
          new Date(2024, 4, 10).toString(),
          new Date(2024, 4, 16).toString(),
          [new Product('1', 'Product 1', 'Description 1', 10.99, 100, null)],
        ),
        new Discount(
          1,
          new Date(2024, 4, 10).toString(),
          new Date(2024, 4, 16).toString(),
          [new Product('2', 'Product 2', 'Description 2', 20.99, 200, null)],
        ),
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(discounts);

      expect(await service.findAll()).toEqual(discounts);
    });

    it('should throw an error if no discounts are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow('No record found.');
    });
  });

  describe('findOne', () => {
    it('should return a discount if found', async () => {
      const discountId = '1';

      const product: Product = new Product(
        '1',
        'Product 1',
        'Description of Product 1',
        10.99,
        100,
        null,
      );
      const discount: Discount = new Discount(
        1,
        new Date(2024, 4, 10).toString(),
        new Date(2024, 4, 16).toString(),
        [product],
      );

      jest.spyOn(repository, 'findOne').mockResolvedValue(discount);

      expect(await service.findOne(discountId)).toEqual(discount);
    });

    it('should throw an error if discount is not found', async () => {
      const discountId = '1';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(discountId)).rejects.toThrow(
        'Discount not found.',
      );
    });
  });

  describe('update', () => {
    it('should update a discount', async () => {
      const discountId = '1';
      const product: Product = new Product(
        '1',
        'Product 1',
        'Description of Product 1',
        10.99,
        20,
        null,
      );
      const existingDiscount: Discount = new Discount(
        20,
        new Date(2024, 4, 10).toString(),
        new Date(2024, 4, 16).toString(),
        [product],
      );
      const discountDto: DiscountDto = {
        id: '1',
        productsId: ['1'],
        startDate: new Date(2024, 4, 8),
        endDate: new Date(2024, 4, 20),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingDiscount);

      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce({ affected: 1 } as UpdateResult);

      await expect(service.update(discountId, discountDto)).resolves.toEqual({
        affected: 1,
        raw: undefined,
      });

      expect(repository.update).toHaveBeenCalledWith(discountId, discountDto);
    });

    it('should throw an error if discount is not found during update', async () => {
      const discountId = '1';
      const discountDto: DiscountDto = {
        id: '1',
        productsId: ['1'],
        startDate: new Date(2024, 4, 8),
        endDate: new Date(2024, 4, 20),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(discountId, discountDto)).rejects.toThrow(
        'Discount not found.',
      );
    });
  });

  describe('remove', () => {
    it('should remove a discount', async () => {
      const discountId = '1';

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValueOnce({ affected: 1 } as DeleteResult);

      await expect(service.remove(discountId)).resolves.toEqual({
        affected: 1,
      });
      expect(repository.delete).toHaveBeenCalledWith(discountId);
    });
  });
});
