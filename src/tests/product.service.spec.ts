import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../services/products.service';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from '../entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', () => {
      const productDto: ProductDto = {
        id: '1',
        name: 'Product 1',
        description: 'Description of Product 1',
        price: '10.99',
        stockQuantity: 100,
      };
      const createdProduct: Product = new Product(
        '1',
        'Product 1',
        'Description of Product 1',
        10.99,
        100,
        null,
      );

      jest.spyOn(repository, 'create').mockReturnValue(createdProduct);

      expect(service.create(productDto)).toEqual(createdProduct);
      expect(repository.create).toHaveBeenCalledWith(productDto);
    });

    it('should log and rethrow error if repository throws an error', () => {
      const productDto: ProductDto = {
        id: '1',
        name: 'Product 1',
        description: 'Description of Product 1',
        price: '10.99',
        stockQuantity: 100,
      };

      const error = new Error('Some error message');
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw error;
      });

      const loggerSpy = jest.spyOn(service['logger'], 'log');
      expect(() => service.create(productDto)).toThrow(error);
      expect(loggerSpy).toHaveBeenCalledWith(
        `ProductsService:create: ${JSON.stringify(error.message)}`,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [
        new Product('1', 'Product 1', 'Description 1', 10.99, 100, null),
        new Product('2', 'Product 2', 'Description 2', 20.99, 200, null),
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(products);

      expect(await service.findAll()).toEqual(products);
    });

    it('should throw an error if no products are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow('No record found.');
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const productId = '1';
      const product: Product = new Product(
        productId,
        'Product 1',
        'Description 1',
        10.99,
        100,
        null,
      );

      jest.spyOn(repository, 'findOne').mockResolvedValue(product);

      expect(await service.findOne(productId)).toEqual(product);
    });

    it('should throw an error if product is not found', async () => {
      const productId = '1';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(productId)).rejects.toThrow(
        'Product not found.',
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productId = '1';
      const productDto: ProductDto = {
        id: productId,
        name: 'Updated Product',
        description: 'Updated Description',
        price: '20.99',
        stockQuantity: 200,
      };

      const existingProduct: Product = new Product(
        productId,
        'Product 1',
        'Description 1',
        10.99,
        100,
        null,
      );

      jest.spyOn(service, 'findOne').mockResolvedValue(existingProduct);

      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce({ affected: 1 } as UpdateResult);

      await expect(service.update(productId, productDto)).resolves.toEqual({
        affected: 1,
        raw: undefined,
      });

      expect(repository.update).toHaveBeenCalledWith(productId, productDto);
    });

    it('should throw an error if product is not found during update', async () => {
      const productId = '1';
      const productDto: ProductDto = {
        id: productId,
        name: 'Updated Product',
        description: 'Updated Description',
        price: '20.99',
        stockQuantity: 200,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(productId, productDto)).rejects.toThrow(
        'Product not found.',
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
