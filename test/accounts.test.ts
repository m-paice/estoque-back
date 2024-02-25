import sequelize from '../src/services/sequelize';
import Account from '../src/models/Accounts';

describe('Account', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // create account test case
  it('should create a new account', async () => {
    const account = await Account.create({ name: 'John Doe' });

    expect(account.id).toBeDefined();
    expect(account.name).toBe('John Doe');
  });

  // find account test case
  it('should find an account', async () => {
    const account = await Account.findOne({ where: { name: 'John Doe' } });

    expect(account).toBeDefined();
    expect(account?.name).toBe('John Doe');
  });

  // update account test case
  it('should update an account', async () => {
    const account = await Account.findOne({ where: { name: 'John Doe' } });

    if (account) {
      account.name = 'Jane Doe';
      await account.save();
    }

    const updatedAccount = await Account.findOne({ where: { name: 'Jane Doe' } });

    expect(updatedAccount).toBeDefined();
    expect(updatedAccount?.name).toBe('Jane Doe');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
