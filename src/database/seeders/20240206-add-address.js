module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('address', [
      {
        id: 'ac2c5d77-6753-4bf2-9ea1-edacc2899bdb',
        userId: '824f35c0-359a-4509-8b73-192eaaca21b8',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        zipcode: '17511300',
        street: 'Rua João de Oliveira',
        number: '123',
        complement: 'Casa',
        neighborhood: 'Jardim Santa Clara',
        city: 'Marília',
        state: 'SP',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('address', null, {});
  },
};
