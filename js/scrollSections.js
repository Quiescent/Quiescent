var createSectionScroller = function(rootSelector) {
    var rootDiv = document.querySelector(rootSelector);

    if (!rootDiv) {
        var errorMessage = 'Couldn\'t find root element with selector: ' + rootSelector;
        console.error(errorMessage);
        return {error: errorMessage};
    }

    var sectionIds = [];
    rootDiv
        .querySelectorAll('section')
        .forEach(function (element) {
            sectionIds.push(element.id);
        });

    var activeIndex = 0;

    var activateCurrent = function () {
        sectionIds
            .forEach(function (id) {
                document
                    .querySelector('#' + id)
                    .classList
                    .add('hidden');
            });
        document
            .querySelector('#' + sectionIds[activeIndex])
            .classList
            .remove('hidden');
    };

    activateCurrent();

    document.addEventListener('wheel', function(event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            activeIndex++;
            activeIndex = activeIndex % sectionIds.length;
        } else {
            activeIndex--;
            if (activeIndex < 0) activeIndex = sectionIds.length - 1;
        }
        activateCurrent();
    });

    return {};
};
