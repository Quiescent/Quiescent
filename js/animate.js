/* jshint esversion: 6 */

/** Assumptions.
 * 
 * Available libraries:
 *  - jquery.js;
 *  - highlight.js;
 */

const SECONDS_FOR_ANIMATION = 10;
const ANCHOR = ".code";
let miliSecondsIntoAnitamion = 0;
let milisecondsPerStep = 0;
let originalContent = "";

function highlight() {
    document.querySelectorAll(ANCHOR)
        .forEach(block => hljs.highlightBlock(block));
}

function initAnimation() {
    originalContent = $(ANCHOR).html();
    scheduleAnimation();
}

function scheduleAnimation() {
    miliSecondsIntoAnitamion = 0;
    $(ANCHOR).html("");
    milisecondsPerStep = (SECONDS_FOR_ANIMATION * 1000) / originalContent.length;
    setTimeout(updateAnimation, milisecondsPerStep);
}

function updateAnimation() {
    miliSecondsIntoAnitamion += milisecondsPerStep;
    if ((miliSecondsIntoAnitamion / 1000) > SECONDS_FOR_ANIMATION) {
        // scheduleAnimation();
        return;
    }

    let charactersPerStep = 1 / milisecondsPerStep;
    let lengthToShow = miliSecondsIntoAnitamion * charactersPerStep;
    $(ANCHOR).html(originalContent.substr(0, lengthToShow));
    highlight();
    setTimeout(updateAnimation, milisecondsPerStep);
}
