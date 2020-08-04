function setupSubscriptionForm() {
    var mailingListContainer = document.getElementById("mailing-list-container");
    var mailingListSignup = document.getElementById("mailing-list-signup");
    var SUBSCRIBED_COOKIE = "subscribed";

    function thanksForSubscribing() {
        mailingListContainer.innerHTML = "<h4>Thanks for subscribing!</h4>";
        Cookies.set(SUBSCRIBED_COOKIE, "subscribed");
    }

    var form = document.getElementById("mc-embedded-subscribe-form");
    form.addEventListener('submit', thanksForSubscribing);

    if (Cookies.get(SUBSCRIBED_COOKIE)) {
        mailingListSignup.innerHTML = "";
    }
}

setupSubscriptionForm();
