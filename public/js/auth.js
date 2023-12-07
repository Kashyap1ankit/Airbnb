// Selecting Element
const container = document.querySelector(".container");
const navbar = document.querySelector(".navbar");
const footer = document.querySelector(".f-info");

//Signup all buttons
const signupModal = document.querySelector(".signup-modal");
const signIn = document.querySelector(".sign-in");

//Login all buttons

const loginModal = document.querySelector(".login-modal");

const createAccount = document.querySelector(".create-account");

const login = document.querySelector(".login");
const signup = document.querySelector(".signup");

const blurIn = function () {
  container.style.filter = "blur(10px)";
  navbar.style.filter = "blur(10px)";
  footer.style.filter = "blur(10px)";
};

const blurOut = function () {
  container.style.filter = "blur(0px)";
  navbar.style.filter = "blur(0px)";
  footer.style.filter = "blur(0px)";
};

//4.Signup-Login button features

//get the signup modal feature

const signupButtonsArray = [signup, createAccount];

const signupFn = function (e) {
  e.addEventListener("click", function (eve) {
    loginModal.classList.add("hidden");
    signupModal.classList.remove("hidden");
    blurIn();
  });
};

signupButtonsArray.forEach(signupFn);

//Login modal open feature

const loginModalArray = [login, signIn];

const loginFn = function (e) {
  e.addEventListener("click", function (eve) {
    signupModal.classList.add("hidden");
    loginModal.classList.remove("hidden");
    blurIn();
  });
};

loginModalArray.forEach(loginFn);

//Cross button feature

const crossArray = document.querySelectorAll(".cross");

crossArray.forEach(function (e) {
  e.addEventListener("click", function (eve) {
    eve.target.closest(".modals").classList.add("hidden");
    blurOut();
    location.reload();
  });
});
