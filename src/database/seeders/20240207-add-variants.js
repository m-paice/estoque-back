module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('variants', [
      {
        id: 'ac2c5d77-6753-4bf2-9ea1-edacc2899bdb',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        price: 1299.9,
        amount: 10,
        color: 'black',
        size: 'M',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('variants', null, {});
  },
};
