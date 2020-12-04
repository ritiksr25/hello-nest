import { Item } from '../interfaces/item.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '100',
      name: 'Item 1',
      description: 'Item 1 desc',
      quantity: 100,
    },
    {
      id: '101',
      name: 'Item 2',
      description: 'Item 2 desc',
      quantity: 100,
    },
    {
      id: '102',
      name: 'Item 3',
      description: 'Item 3 desc',
      quantity: 100,
    },
  ];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    return this.items.find((item) => item.id === id);
  }
}
