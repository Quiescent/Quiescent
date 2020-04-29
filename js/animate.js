/* jshint esversion: 6 */

/** Assumptions.
 * 
 * Available libraries:
 *  - jquery.js;
 *  - highlight.js;
 */

const SECONDS_FOR_CODE_ANIMATION = 10;
const SECONDS_FOR_BOX_ANIMATION = 10;
const CODE_ANCHOR = ".code";
const BOX_ANCHOR = ".window";
const BOX_HEIGHT = 200;
const SCREEN_FULLS = 4;
let screenfullsCompleted = 0;
let boxTopPosition = 0;
let miliSecondsIntoAnitamion = 0;
let milisecondsPerStep = 0;
let originalContent = "";
let milisecondsPerBoxStep = 0;

function highlight() {
    document.querySelectorAll(CODE_ANCHOR)
        .forEach(block => hljs.highlightBlock(block));
}

function initAnimation() {
    originalContent = $(CODE_ANCHOR).html();
    scheduleBoxMovement();
}

function scheduleBoxMovement() {
    screenfullsCompleted = 0;
    milisecondsPerBoxStep = (SECONDS_FOR_BOX_ANIMATION * 1000) / SCREEN_FULLS;
    setTimeout(updateBoxMovement, milisecondsPerBoxStep);
}

function updateBoxMovement() {
    screenfullsCompleted += 1;
    if (screenfullsCompleted > SCREEN_FULLS) {
        return;
    }
    
    document.querySelectorAll(BOX_ANCHOR)[0].style.top=`${screenfullsCompleted * (BOX_HEIGHT + 50)}px`;
    setTimeout(updateBoxMovement, milisecondsPerBoxStep);
}

function scheduleAnimation() {
    miliSecondsIntoAnitamion = 0;
    $(CODE_ANCHOR).html("");
    milisecondsPerStep = (SECONDS_FOR_CODE_ANIMATION * 1000) / originalContent.length;
    setTimeout(updateAnimation, milisecondsPerStep);
}

function updateAnimation() {
    miliSecondsIntoAnitamion += milisecondsPerStep;
    if ((miliSecondsIntoAnitamion / 1000) > SECONDS_FOR_CODE_ANIMATION) {
        // scheduleAnimation();
        return;
    }

    let charactersPerStep = 1 / milisecondsPerStep;
    let lengthToShow = miliSecondsIntoAnitamion * charactersPerStep;
    $(CODE_ANCHOR).html(originalContent.substr(0, lengthToShow));
    highlight();
    setTimeout(updateAnimation, milisecondsPerStep);
}
