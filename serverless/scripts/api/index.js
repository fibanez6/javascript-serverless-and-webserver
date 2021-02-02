/*
This javascript simulates the behavior of REST calls to a server.

It stores the data in the  browser sessionStorage. The  sessionStorage
object stores data for only one  session (the data is deleted when the
browser tab is closed).

This could be replaced by REST calls or localStorage. The localStorage
property which stores data with no expiration date. The  data will not
be deleted when the browser is closed.
 */

const ANIMALS = "animals";
const FAMILIES = "families";

// GET /pet/families
function getFamilyList() {
    let families = sessionStorage.getList(FAMILIES);
    if (families.length == 0) {
        families = familyData();
        sessionStorage.setList(FAMILIES, families);
    }

    let animals = getAnimalList();
    let counter = _.reduce(animals, function(r, e) { r[e.family] = ( r[e.family] || 0 ) + 1; return r; }, {});

    return _.map(families, function (elt) {
        return _.extend({}, elt, { total: counter[elt.name] || 0 })
    });
}

// GET /pet/family/<familyId>
function getAnimalsByFamilyId(familyId) {
    let animalList = getAnimalList();
    return _.filter(animalList, { 'family': familyId });
}

// GET /pet/animals
function getAnimalList() {
    let animals = sessionStorage.getList(ANIMALS);
    if (animals.length == 0) {
        animals = animalData();
        sessionStorage.setList(ANIMALS, animals);
    }
    return animals;
}

// DELETE /pet/animal/<animalId>
function deleteAnimal(animalId) {
    let animals = sessionStorage.getList(ANIMALS);
    _.remove(animals, {name: animalId});
    sessionStorage.setList(ANIMALS, animals);
    return animalId;
}

// POST /pet/animal
function postAnimal(animal) {
    let err;
    let animalList = sessionStorage.getList(ANIMALS) || [];
    let existingAnimalByName = _.find(animalList, { 'name': animal.name });
    if (existingAnimalByName) {
        err = new Error(`Animal with name='${animal.name}' already exists`);
        return {undefined, err};
    }

    let familyList = sessionStorage.getList(FAMILIES) || [];
    let existingFamilyByName = _.find(familyList, { 'name': animal.family });
    if (!existingFamilyByName) {
        err = new Error(`Family with name='${animal.family}' does not exist`);
        return {undefined, err};
    }

    // save it
    sessionStorage.addItemList(ANIMALS, animal);
    return {animal, err};
}