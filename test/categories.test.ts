import sequelize from '../src/services/sequelize';
import Category from '../src/models/Categories';
import Account from '../src/models/Accounts';

describe('Category', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // create category test case
  it('should create a new category', async () => {
    const account = await Account.create({ name: 'John Doe' });
    expect(account.id).toBeDefined();
    expect(account.name).toBe('John Doe');

    const category = await Category.create({ name: 'Food', description: '', accountId: account.id });
    expect(category.id).toBeDefined();
    expect(category.name).toBe('Food');
  });

  // find category test case
  it('should find a category', async () => {
    const category = await Category.findOne({ where: { name: 'Food' } });

    expect(category).toBeDefined();
    expect(category?.name).toBe('Food');
  });

  // update category test case
  it('should update a category', async () => {
    const category = await Category.findOne({ where: { name: 'Food' } });

    if (category) {
      category.name = 'Drinks';
      await category.save();
    }

    const updatedCategory = await Category.findOne({ where: { name: 'Drinks' } });

    expect(updatedCategory).toBeDefined();
    expect(updatedCategory?.name).toBe('Drinks');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
