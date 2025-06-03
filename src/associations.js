// src/models/associations.js
const { Species } = require('./species/species.Model');
const { Animal } = require('./animals/animals.Model');
const { User } = require('./login/user.Model');


const defineAssociations = () => {
    Species.hasMany(Animal, { foreignKey: 'speciesId' });
    Animal.belongsTo(Species, { foreignKey: 'speciesId' });
    Animal.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Animal, { foreignKey: 'userId' });
    Species.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Species, { foreignKey: 'userId' });
};

module.exports = defineAssociations;
