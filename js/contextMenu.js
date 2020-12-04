function createContextMenu (rootSelector, buttonSelector) {
    var contextMenuRoot = document.querySelector(rootSelector);
    var button = document.querySelector(buttonSelector);

    if (!contextMenuRoot) {
        console.error("Couldn't find root element with query selector: " + rootSelector);
        return {};
    }

    if (!button) {
        console.error("Couldn't find button element with query selector: " + buttonSelector);
        return {};
    }

    var menuIsVisible = false;

    var toggleVisibility = function () {
        menuIsVisible = !menuIsVisible;
        var box = button.getBoundingClientRect();

        if (menuIsVisible) {
            contextMenuRoot.style.display = 'block';
        } else {
            contextMenuRoot.style.display = '';
        }
        contextMenuRoot.style.top = box.height + 'px';
    };

    var maybeHideMenu = function (event) {
        if (menuIsVisible && !button.contains(event.target)) {
            contextMenuRoot.style.display = '';
            menuIsVisible = false;
        }
    };

    button.addEventListener(
        'click',
        toggleVisibility
    );
    document.addEventListener(
        'click',
        maybeHideMenu
    );

    return {};
}
