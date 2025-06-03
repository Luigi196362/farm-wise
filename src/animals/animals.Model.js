const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Species } = require('../species/species.Model');
const { User } = require('../login/user.Model');

const Animal = sequelize.define('Animals', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  speciesId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: {
      model: 'Species',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  }

});


const findAll = async (userId) => {

  return await Animal.findAll({ where: { userId } },
    {
      include: [{
        model: Species,
        attributes: ['id', 'name']
      }, {
        model: User,
        attributes: ['id', 'username']
      }]
    }
  );
};

const findAnimalsByGroupName = async (groupName) => {
  return await Animal.findOne({ where: { groupName } });
};

const createAnimals = async (data) => {
  return await Animal.create(data);
};


module.exports = { Animal, createAnimals, findAll, findAnimalsByGroupName };