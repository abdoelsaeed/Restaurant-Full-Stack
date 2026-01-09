/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { FoodSchema } from './food.schema';

export const foodProviders = [
  {
    provide: 'FOOD_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Food', FoodSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
