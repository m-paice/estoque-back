import e from 'cors';
import sequelize from '../src/services/sequelize';
import Product from '../src/models/Products';
import Account from '../src/models/Accounts';
import Category from '../src/models/Categories';

describe('Product', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // create product test case
  it('should create a new product', async () => {
    const account = await Account.create({ name: 'John Doe' });
    expect(account.id).toBeDefined();
    expect(account.name).toBe('John Doe');

    const category = await Category.create({ name: 'Drinks', description: '', accountId: account.id });
    expect(category.id).toBeDefined();
    expect(category.name).toBe('Drinks');

    const product = await Product.create({
      name: 'Pizza',
      description: '',
      price: 10,
      amount: 100,
      accountId: account.id,
      categoryId: category.id,
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Pizza');
  });

  // find product test case
  it('should find a product', async () => {
    const product = await Product.findOne({ where: { name: 'Pizza' }, include: ['account', 'category'] });

    if (!product) {
      throw new Error('Product not found');
    }

    expect(product).toBeDefined();
    expect(product.name).toBe('Pizza');

    expect(product.account).toBeDefined();
    expect(product.account.name).toBe('John Doe');

    expect(product.category).toBeDefined();
    expect(product.category.name).toBe('Drinks');
  });

  // update product test case
  it('should update a product', async () => {
    const product = await Product.findOne({ where: { name: 'Pizza' } });

    if (product) {
      product.name = 'Burger';
      await product.save();
    }

    const updatedProduct = await Product.findOne({ where: { name: 'Burger' } });

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct?.name).toBe('Burger');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
