const
    globalButton = document.getElementById('global-button'),
    specificButton = document.getElementById('specific-button'),
    panel = document.getElementById("main-panel");


customElements.whenDefined('global-family-panel').then(() => {
    let GlobalFamilyPanel = customElements.get('global-family-panel');
    document.getElementById("main-panel").appendChild(new GlobalFamilyPanel());
});

// Displays the global list
addEventListeners(globalButton, 'click', function (e) {
    e.preventDefault();

    if (globalButton.classList.contains("active")) {
        // do nothing
        return;
    }

    globalButton.classList.add("active");
    specificButton.classList.remove("active");

    dispatchPanelChild();

    // Inserts the global family panel to the DOM
    let GlobalFamilyPanel = customElements.get('global-family-panel');
    panel.appendChild(new GlobalFamilyPanel());
});

// Displays the specific list
addEventListeners(specificButton, 'click', function (e) {
    e.preventDefault();

    if (specificButton.classList.contains("active")) {
        // do nothing
        return;
    }

    globalButton.classList.remove("active");
    specificButton.classList.add("active");

    dispatchPanelChild();

    // Inserts the specific family panel to the DOM
    let SpecificFamilyPanel = customElements.get('specific-family-panel');
    panel.appendChild(new SpecificFamilyPanel());
});

function dispatchPanelChild() {
    while (panel.firstChild) {
        panel.firstChild.remove();
    }
}

function addEventListeners(elt, events, fn) {
    events.split(' ').forEach(event =>
        elt.addEventListener(event, fn, false)
    );
}