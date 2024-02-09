module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('accounts', [
      {
        id: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Default Account',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
