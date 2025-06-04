class AnimalDto {

    constructor(id, groupName, species, quantity) {
        this.id = id;
        this.groupName = groupName;
        this.species = species;
        this.speciesId = species.id;
        this.quantity = quantity;

    }
}

module.exports = AnimalDto;