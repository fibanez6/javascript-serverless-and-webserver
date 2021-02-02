import { getFamilies } from "../actions.js";
import {FAMILY_LIST, ADD_ANIMAL} from "../constants.js";

let template = document.createElement('template');
template.innerHTML = `
   <div id="family-div">
        <h3>Global family list</h3>
        <table class="top attached ui basic table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Noise</th>
            <th>Total</th>
            </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
`;

class GlobalFamilyList extends HTMLElement {

    constructor() {
        super();
        this.render = this.render.bind(this);

        this.families=[];
        this.panel = template.content.cloneNode(true);
        this.tbody = this.panel.querySelector('tbody');
        this.appendChild(this.panel);
    }

    // Retrieves the family list when (after) this element is attached to the DOM.
    connectedCallback() {
        getFamilies()
    }

    _clean() {
        while (this.tbody.firstChild) {
            this.tbody.firstChild.remove();
        }
    }

    update(prop) {
        if (prop.type === FAMILY_LIST) {
            this.families = prop.families;
        }
        if (prop.type === ADD_ANIMAL) {
            getFamilies()
        }
        this._clean();
        this.render();
    }

    _renderRow({ name, noise, total }) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${name}</td><td>${noise}</td><td>${total}</td>`;
        this.tbody.appendChild(tr);
    }

    render() {
        this.families.forEach( f => this._renderRow(f));
    }
}

customElements.define('global-family-list', GlobalFamilyList);