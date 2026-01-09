/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { WishlistSchema } from './wishlist.schema';

export const wishlistsProviders = [
  {
    provide: 'WISHLIST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Wishlist', WishlistSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
