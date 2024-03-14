module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories_products', [
      {
        categoryId: '6b1ed9ec-d9e6-4f9d-bf8b-b4e866f83df2',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        categoryId: '3647bc26-769c-4150-8dce-940e4af9f539',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories_products', null, {});
  },
};
