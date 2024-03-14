module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('products', [
      {
        id: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Notebook',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0b',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Smartphone',
        description: '',
        price: 200,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0c',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Tablet',
        description: '',
        price: 300,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
