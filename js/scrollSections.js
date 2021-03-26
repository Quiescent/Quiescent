var createSectionScroller = function(rootSelector, nextButtonSelector, previousButtonSelector) {
    var rootDiv = document.querySelector(rootSelector);
    var nextButton = nextButtonSelector && document.querySelector(nextButtonSelector);
    var previousButton = previousButtonSelector && document.querySelector(previousButtonSelector);

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

    var currentElementClassList = function () {
        return document
            .querySelector('#' + sectionIds[activeIndex])
            .classList;
    };

    var activateCurrent = function () {
        sectionIds
            .forEach(function (id) {
                var classList = document
                    .querySelector('#' + id)
                    .classList;
                if (classList.contains('slide-in')) {
                    classList.add('slide-out');
                    classList.remove('slide-in');
                } else {
                    classList.remove('slide-out');
                }
                classList.add('hidden');
            });
        currentElementClassList().remove('hidden');
        currentElementClassList().add('slide-in');
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

    if (nextButton || previousButton) {
        document.addEventListener('click', function(event) {
            if (event.target.children[0] === nextButton) {
                activeIndex++;
                activeIndex = activeIndex % sectionIds.length;
                activateCurrent();
            } else if (event.target.children[0] === previousButton) {
                activeIndex--;
                if (activeIndex < 0) activeIndex = sectionIds.length - 1;
                activateCurrent();
            }
        });
    }

    return {};
};
