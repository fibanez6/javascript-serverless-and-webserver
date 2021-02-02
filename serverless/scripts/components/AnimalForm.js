;(function () {
    'use strict';

    const template = document.createElement('template');
    template.innerHTML = `
       <div id="new-animal-div">
            <h3>New animal</h3>
            <div class="ui message" style="display: none">
                  <i class="close icon"></i>
                  <div class="header"></div>
            </div>
            <form class="ui form" id="add-animal-form" onsubmit="return false">
                <div class="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name">
                </div>
                <div class="field">
                    <label>Family Name</label>
                    <input type="text" name="family" placeholder="Family Name">
                </div>
                 <div class="field">
                    <label>Age</label>
                    <input type="number" name="age" placeholder="Age">
                </div>
                <button id="submit-button" class="ui button">Add</button>
            </form>
        </div>
    `;

    class AnimalForm extends HTMLElement {

        constructor() {
            super();
            this.panel = template.content.cloneNode(true);
            this.messageDiv =  this.panel.querySelector(".ui.message");
            this.form = this.panel.querySelector('form');
            this.appendChild(this.panel);

            this._addFormEventListeners();
            this._addMessageCloseEventListeners();
        }

        _addFormEventListeners() {
            this.form.addEventListener('submit', function (e) {
                e.preventDefault();

                let inputs = e.target.querySelectorAll('input');
                let values = _.reduce(inputs, function(r, e) { r[e.name] = e.value ; return r; }, {});

                addAnimal(values);
            });
        };

        _addMessageCloseEventListeners() {
            let messageDiv = this.messageDiv;
            let closeIcon = this.messageDiv.querySelector(".close.icon");
            closeIcon.addEventListener('click', function (e) {
                e.preventDefault();
                messageDiv.style.display='none';
            });
        }

        update({animal, err}) {
            let messageTextDiv = this.messageDiv.querySelector(".header");

            // display a successful or error message
            this.messageDiv.style.display='';
            if (err) {
                this.messageDiv.classList.add("negative");
                this.messageDiv.classList.remove("positive");
                messageTextDiv.innerText=err;
            } else {
                this.messageDiv.classList.remove("negative");
                this.messageDiv.classList.add("positive");
                messageTextDiv.innerText='Created';
            }

            // cleans the form input values
            let inputs = this.form.querySelectorAll('input');
            inputs.forEach( i => i.value = '' )
        }
    }

    customElements.define('add-animal-form', AnimalForm);

})();