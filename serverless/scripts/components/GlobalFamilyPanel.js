;(function () {
    'use strict';

    let template = document.createElement('template');
    template.innerHTML = `
       <div class="column" >
            <div class="ui segment">
                <global-family-list></global-family-list>
            </div>
        </div>
        <div class="column">
            <div class="ui segment">
                <add-animal-form></add-animal-form>
            </div>
        </div>
    `;
    
    class GlobalFamilyPanel extends HTMLElement {
        constructor() {
            super();
            this.panel = template.content.cloneNode(true);
            this.appendChild(this.panel);
        }
    }
    
    customElements.define('global-family-panel', GlobalFamilyPanel);

})();