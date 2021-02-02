import {ADD_ANIMAL, ADD_ANIMAL_ERROR, DELETE_ANIMAL, ANIMAL_LIST, FAMILY_LIST} from "./constants.js";
import {deleteAnimal, getAnimalsByFamilyId, getFamilyList, postAnimal} from "./api";

/*
This javascript simulates the behaviour of Prop in React.

The term “render prop” refers to a technique for sharing code between
React components using a prop whose value is a function.
 */

export function getFamilies() {
    let list = getFamilyList();
    let prop = {
        type: FAMILY_LIST,
        families: list
    };
    update(prop);
    return prop;
}

export function getAnimalList(familyId) {
    let list = getAnimalsByFamilyId(familyId);
    let prop = {
        type: ANIMAL_LIST,
        animals: list
    };
    update(prop);
    return prop;
}

export function addAnimal(animal) {
    let {result, err} = postAnimal(animal);
    let prop;
    if (err) {
        prop = {
            type: ADD_ANIMAL_ERROR,
            err: err.toString()
        };
    } else {
        prop = {
            type: ADD_ANIMAL,
            animal: result
        };
    }
    update(prop);
    return prop;
}

export function removeAnimal(name) {
    deleteAnimal(name);
    let prop = {
        type: DELETE_ANIMAL
    };
    update(prop);
    return prop;
}

export function update(prop) {
    switch (prop.type) {
        case FAMILY_LIST:
            if (document.getElementsByTagName("global-family-list").length > 0) {
                document.getElementsByTagName("global-family-list")[0].update(prop);
            }
            if (document.getElementsByTagName("specific-family-panel").length > 0) {
                document.getElementsByTagName("specific-family-panel")[0].update(prop);
            }
            break;
        case ANIMAL_LIST:
            document.getElementsByTagName("specific-family-panel")[0].update(prop);
            break;
        case ADD_ANIMAL:
            document.getElementsByTagName("add-animal-form")[0].update(prop);
            break;
        case DELETE_ANIMAL:
            document.getElementsByTagName("specific-family-panel")[0].update(prop);
            break;
        case ADD_ANIMAL_ERROR:
            document.getElementsByTagName("add-animal-form")[0].update(prop);
            break;

    }
}
