function createContextMenu (rootSelector, buttonSelector, placeOnLeft) {
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
        contextMenuRoot.style.top = box.top - box.height + 'px';
        if (placeOnLeft) {
            contextMenuRoot.style.right = window.innerWidth - box.left + 'px';
        } else {
            contextMenuRoot.style.left = box.left + box.width + 'px';
        }
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

    var destroyMenu = function () {
        button.removeEventListener(
            'click',
            toggleVisibility
        );
        document.removeEventListener(
            'click',
            maybeHideMenu
        );
        contextMenuRoot.style.top = '';
        contextMenuRoot.style.left = '';
        contextMenuRoot.style.right = '';
    };

    return {
        destroyMenu: destroyMenu
    };
}
