;(function () {
    'use strict';

    const ATTRIBUTE_ANIMAL_ID = "data-animal-id";

    let template = document.createElement('template');
    template.innerHTML = `
       <div class="column" >
            <div class="ui segments">
                <div class="ui segment">
                  <h3>Specific Family list</h3>
                  <div class="ui compact selection dropdown">
                        <label>Family</label>
                        <i class="dropdown icon"></i>
                        <div class="menu"></div>
                    </div>
                </div>
                <div class="ui segments">
                   <div id="specific-family-div">
                        <table class="top attached ui basic table">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    class SpecificFamilyPanel extends HTMLElement {
        constructor() {
            super();

            this.families=[];
            this.animals=[];
            this.activeFamily ="";

            this.panel = template.content.cloneNode(true);
            this.dropdown = this.panel.querySelector('div.ui.selection.dropdown');
            this.tbody = this.panel.querySelector('tbody');
            this.appendChild(this.panel);

            this._addDropdownEventListeners(this.dropdown);
        }

        // Retrieves the family list when (after) this element is attached to the DOM.
        connectedCallback() {
            getFamilies();
        }

        _addDropdownEventListeners(dropdown) {
            let parent = this;
            dropdown.addEventListener('click', function (e) {
                e.preventDefault();

                dropdown.classList.toggle("active");
                dropdown.classList.toggle("visible");
                let menu = dropdown.querySelector("div.menu");
                (menu.style.display === "block") ? menu.style.display = "none" : menu.style.display = "block";

                if (e.target.classList.contains("item")) {
                    let itemSelected = dropdown.querySelector("div.active");
                    if (itemSelected) {
                        itemSelected.classList.remove("active", "selected");
                    }
                    let item = e.target;

                    // set activeFamily
                    parent.activeFamily=item.innerText;
                    item.classList.add("active", "selected");
                    dropdown.querySelector("label").innerText = item.innerText;

                    getAnimalListByFamilyId(item.innerText);
                }
            });
        };

        update(prop) {
            if (prop.type == DELETE_ANIMAL) {
                getAnimalListByFamilyId(this.activeFamily);
                return;
            }
            if (prop.type == FAMILY_LIST) {
                this.families = prop.families;
            }
            if (prop.type == ANIMAL_LIST) {
                this.animals = prop.animals;
            }
            this._clean();
            this.render();
        }

        _clean() {
            // remove dropdown options
            let menu = this.dropdown.querySelector("div.menu");
            while (menu.firstChild) {
                menu.firstChild.remove();
            }
            // remove table rows
            while (this.tbody.firstChild) {
                this.tbody.firstChild.remove();
            }
        }

        _renderDropdownItems({ name }) {
            let menu = this.dropdown.querySelector("div.menu");
            let item = document.createElement('div');
            item.id= _.uniqueId(`${name}_`);
            item.classList.add("item");
            item.innerHTML = `${name}`;
            menu.appendChild(item);
        }

        _renderTableRow({ name, age }) {
            let id = _.uniqueId();
            let tr = document.createElement('tr');
            tr.id= `${name}_${id}`;
            tr.innerHTML=`
                <td>${name}</td>
                <td>${age}</td>
                <td><button id="delete_button" class="ui button" aria-pressed="false">Delete</button></td>`;

            let button = tr.querySelector('button');
            button.setAttribute(ATTRIBUTE_ANIMAL_ID, name);
            this._addButtonEventListeners(button);

            this.tbody.appendChild(tr);
        }

        _addButtonEventListeners(button) {
            button.addEventListener('click', function (e) {
                const animalName = button.getAttribute(ATTRIBUTE_ANIMAL_ID);
                removeAnimal(animalName);
            });
        }

        render() {
            this.families.forEach( f => this._renderDropdownItems(f));
            this.animals.forEach( a => this._renderTableRow(a));
        }
    }

    customElements.define('specific-family-panel', SpecificFamilyPanel);

})();