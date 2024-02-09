module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: '824f35c0-359a-4509-8b73-192eaaca21b8',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        name: 'Default User',
        cellPhone: '00000000000',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
