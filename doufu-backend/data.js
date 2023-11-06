import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Kevin',
      email: 'kevin@example.com',
      password: bcrypt.hashSync('test'),
      isAdmin: true,
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      password: bcrypt.hashSync('password'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Red Bean Bun',
      slug: 'red-bean-bun',
      category: 'buns',
      image: '/images/redbun.jpg',
      price: 5,
      stock: 10,
      rating: 4.2,
      reviewCount: 5,
      desc: 'Delicious bun with red bean filling',
    },
    {
      // _id: '2',
      name: 'Burnt Cheese Cakes',
      slug: 'burnt-cheese-cakes',
      category: 'cakes',
      image: '/images/burntcake.jpg',
      price: 8,
      stock: 0,
      rating: 4.5,
      reviewCount: 9,
      desc: 'Delicious cheese cake with a burnt finish on the top',
    },
    {
      // _id: '3',
      name: 'Pineapple Bun',
      slug: 'pineapple-bun',
      category: 'buns',
      image: '/images/pineapplebun.jpg',
      price: 5,
      stock: 12,
      rating: 4.5,
      reviewCount: 15,
      desc: 'Delicious bun with a pineapple like look on the top',
    },
    {
      // _id: '4',
      name: 'Green Bean Bun',
      slug: 'green-bean-bun',
      category: 'buns',
      image: '/images/greenbun.jpeg',
      price: 5,
      stock: 10,
      rating: 4.2,
      reviewCount: 5,
      desc: 'Delicious bun with green bean filling',
    },
  ],
};

export default data;
