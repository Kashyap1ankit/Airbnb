// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//Flash

const successAlert = document.querySelector(".alert-success");
const warningAlert = document.querySelector(".alert-warning");

const removeAlert = function (e) {
  if (e) {
    setTimeout(() => {
      e.classList.add("hidden");
    }, 3000);
  }
};

if (successAlert) {
  removeAlert(successAlert);
}

if (warningAlert) {
  removeAlert(warningAlert);
}

//Tax js
let taxBtn = document.querySelector(".filter-tax");
let cardPriceBeforeTax = document.querySelectorAll(".card-text-pricing");
let cardPriceAfterTax = document.querySelectorAll(".card-text-pricing-tax");
let formLabelAfter = document.querySelector(".form-check-label-after");
let formLabelBefore = document.querySelector(".form-check-label-before");

taxBtn.addEventListener("click", () => {
  cardPriceBeforeTax.forEach((e) => {
    e.classList.toggle("hidden");
    cardPriceAfterTax.forEach((e) => {
      e.classList.toggle("hidden");
    });
  });
  formLabelBefore.classList.toggle("hidden");
  formLabelAfter.classList.toggle("hidden");
});

// // Disable right-click(inspect-option)

// document.addEventListener("contextmenu", (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, "I") ||
//     ctrlShiftKey(e, "J") ||
//     ctrlShiftKey(e, "C") ||
//     (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
//   )
//     return false;
// };
