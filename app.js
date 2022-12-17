const displayImage = document.querySelector(".profile-dp");
const label = document.querySelector(".dp");
const removeImage = document.querySelector(".delete-btn");
const country = document.querySelector(".country");
const dob = document.querySelector(".dob_field");
const email = document.querySelector(".email_field");
const password = document.querySelector(".password_field");
const fullName = document.querySelector(".full_name_field");

let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let regex = /[0-9]/;
let gender = document.querySelectorAll(".gender_radio");
const submitButton = document.querySelector(".submit_form");
gender = [...gender];

// function for email validation
const validateEmail = (email, emailField) => {
  if (!emailregex.test(email)) {
    emailField.style.border = "2px solid red";
    document.querySelector(".email-error").innerHTML =
      "Please enter a valid email";
    return false;
  } else {
    emailField.style.border = "2px solid rgb(98, 61, 146)";
    document.querySelector(".email-error").innerHTML = "";
  }
};

email.addEventListener("input", (e) => {
  validateEmail(e.target.value, e.target);
});

// function for password validation-length must be 8 or above on input
const validatePassword = (password, passwordinput) => {
  if (password.length < 8) {
    passwordinput.style.border = "2px solid red";
    document.querySelector(".password-error").innerHTML =
      "Password must be atleast 8 characters";
    return;
  } else {
    passwordinput.style.border = "2px solid rgb(98, 61, 146)";
    document.querySelector(".password-error").innerHTML = "";
  }
};

password.addEventListener("input", (e) => {
  validatePassword(e.target.value, e.target);
});

// fullname validation. should not accept numbers and should be more than 6 on input
const validateName = (name, namefield) => {
  if (regex.test(name) || name.length < 4) {
    namefield.style.border = "2px solid red";
    document.querySelector(".name-error").innerHTML =
      "Fullname must be more than six and it should have no digits";
    return;
  } else {
    namefield.style.border = "2px solid rgb(98, 61, 146)";
    document.querySelector(".name-error").innerHTML = "";
  }
};

fullName.addEventListener("input", (e) => {
  validateName(e.target.value, e.target);
});

// form validation
submitButton.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullNameValue = fullName.value;
  const passwordValue = password.value;
  const emailValue = email.value;
  const checkbox = document.querySelector(".checkbox_field");

  // check if any gender radio input is checked
  let newGenderArr = gender.filter((gender) => {
    return gender.checked;
  });

  //check if the inputs are empty
  if (
    !fullNameValue ||
    !passwordValue ||
    !emailValue ||
    !checkbox.checked ||
    !dob.value ||
    !newGenderArr.length ||
    !country.value
  ) {
    alert("Please fill all fields");
    return;
  }
  // email validation on submit
  if (!emailregex.test(emailValue)) {
    email.style.border = "2px solid red";
    document.querySelector(".email-error").innerHTML =
      "Please enter a valid email";
    return false;
  } else {
    email.style.border = "2px solid rgb(98, 61, 146)";
    document.querySelector(".email-error").innerHTML = "";
  }

  // password validation on submit
  if (passwordValue.length < 8) {
    password.style.border = "2px solid red";
    document.querySelector(".password-error").innerHTML =
      "Password must be atleast 8 characters";
    return;
  } else {
    password.style.border = "2px solid rgb(98, 61, 146)";
    document.querySelector(".password-error").innerHTML = "";
  }

  // fullname validation on submit
  if (regex.test(fullNameValue) || fullNameValue.length < 4) {
    fullName.style.border = "2px solid red";
    document.querySelector(".name-error").innerHTML =
      "Fullname must be more than six and it should have no digits";
    return;
  } else {
    fullName.style.border = "2px solid rgb(98, 61, 146)";
    document.querySelector(".name-error").innerHTML = "";
  }

  // success alert on submit
  alert("You have successfully signed up");
});

// set maximum and minimum dates for the date
// set the max date to today's date
const date = new Date();
let day = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate();
let month =
  date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
let year = date.getFullYear();
dob.setAttribute("min", "1989-01-01");
dob.setAttribute("max", `${year}-${month}-${day}`);

// uploading profile image and this feature is not required
label.addEventListener("change", (e) => {
  for (const file of e.target.files) {
    console.log(file);
    console.log(file.webkitRelativePath);

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      displayImage.src = e.target.result;
    });

    reader.readAsDataURL(file);
  }
});

removeImage.addEventListener("click", (e) => {
  e.preventDefault();
  displayImage.src = "./images/dummy.png";
});

// populate the country select options with the countries api
const fetchData = async () => {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states"
    );

    const result = await res.json();

    if (result.error) {
      throw new Error(result.msg);
    }
    return result.data;
  } catch (error) {}
};

const renderOptions = (list, selector) => {
  list.forEach((item) => {
    if (item.iso3 !== "COG") {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = item.name;
      option.dataset.id = item.iso3;
      selector.append(option);
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  let countries = await fetchData();
  renderOptions(countries, country);
});
