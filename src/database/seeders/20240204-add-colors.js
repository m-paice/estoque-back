module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('colors', [
      {
        id: '5a1bdd36-c548-4d0e-8287-456d7f4bda24',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        name: 'Azul',
        value: '#0000FF',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '5a1bdd36-c548-4d0e-8287-456d7f4bda25',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        name: 'Vermelho',
        value: '#FF0000',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '5a1bdd36-c548-4d0e-8287-456d7f4bda26',
        accountId: 'b028b437-dc0f-42b5-96f9-cc38d4302a7f',
        productId: 'f1b9f8d7-4d6f-4b3d-9a5e-3f7c0b1f3e0a',
        name: 'Verde',
        value: '#00FF00',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('colors', null, {});
  },
};
