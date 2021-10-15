// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe("pk_test_51ISmCpCXeuEBCS5ZGG3V4ZMmHNEf8rOjo1DKhdQ7CcBHrOqPJy0prqjIHV85bw2RCX4rLL6eZcTGGHcyi2GcDofH00pGHWTyHH");


// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;
fetch("/create-payment-intent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(function(result) {
    return result.json();
  })
  .then(function(data) {
    var elements = stripe.elements();

    var style = {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
  
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

    var card = elements.create("card", { style: style });
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");

    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });

    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked
      if(validate_pay())
      {
        err2.style.opacity = "0";
        lname.style.borderColor = "rgba(50, 50, 93, 0.1)";
        email.style.borderColor = "rgba(50, 50, 93, 0.1)";
        payWithCard(stripe, card, data.clientSecret);
      }
      else
      {
        err2.style.opacity = "1";
        if(lname.value.length == 0) {lname.style.borderBottom = "1px solid red";}
        if(email.value.length == 0) {email.style.borderBottom = "1px solid red";}
      }
    });
  });

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function(stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      receipt_email: document.getElementById('email').value,
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function() {
  loading(false);
  var reff = '/thank-you/' + Api + '?verified=1&express=0&fname='+fname.value+'&lname='+lname.value+'&email='+email.value+'&address='+address.value+'&address2='+address2.value+'&postcode='+postcode.value+'&city='+city.value+'&country='+country.value+'&comment='+comment.value;
  window.location.href = reff;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
