module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('sizes', [
      {
        id: '5a1bdd36-c548-4d0e-8287-456d7f4bda27',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        name: '500GB',
        value: '500gb',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '5a1bdd36-c548-4d0e-8287-456d7f4bda28',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        name: '1TB',
        value: '1TB',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '5a1bdd36-c548-4d0e-8287-456d7f4bda29',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        name: '2TB',
        value: '2TB',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sizes', null, {});
  },
};
