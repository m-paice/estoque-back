module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('orders', {
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
        allowNull: false,
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
      addition: Sequelize.DECIMAL(10, 2),
      discount: Sequelize.DECIMAL(10, 2),
      subtotal: Sequelize.DECIMAL(10, 2),
      total: Sequelize.DECIMAL(10, 2),
      paymentMethod: {
        type: Sequelize.ENUM('card', 'pix', 'cash'),
      },
      status: {
        type: Sequelize.ENUM('awaiting', 'canceled', 'delivered', 'in_progress', 'approved'),
      },
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

  down: (queryInterface) => queryInterface.dropTable('orders'),
};
