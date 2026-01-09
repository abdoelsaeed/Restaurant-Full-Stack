/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const mongoUri =
        process.env.DATABASE_URL ||
        'mongodb+srv://abdoelsaeed2:12345@cluster000.h7jdjme.mongodb.net/restaurantNestJs?retryWrites=true&w=majority&appName=Cluster000';
      return mongoose.connect(mongoUri);
    },
  },
];
