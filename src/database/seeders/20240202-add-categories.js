module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        id: '6b1ed9ec-d9e6-4f9d-bf8b-b4e866f83df2',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Tecnologia',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '3647bc26-769c-4150-8dce-940e4af9f539',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Promoção',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
