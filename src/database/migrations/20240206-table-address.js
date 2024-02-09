module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('address', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      accountId: {
        type: Sequelize.UUID,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      street: Sequelize.STRING,
      number: Sequelize.STRING,
      complement: Sequelize.STRING,
      neighborhood: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      country: Sequelize.STRING,
      zipCode: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('address'),
};
