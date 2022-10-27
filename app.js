const displayImage = document.querySelector(".profile-dp");
const label = document.querySelector(".dp");
const removeImage = document.querySelector(".delete-btn");
const country = document.querySelector(".country");
const dob = document.querySelector(".dob-inpt");
const date = new Date();
let day = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate();
let month =
  date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
let year = date.getFullYear();

console.log(year, month, day);

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

dob.setAttribute("min", "1989-01-01");
dob.setAttribute("max", `${year}-${month}-${day}`);

removeImage.addEventListener("click", () => {
  displayImage.src = "./images/dummy.png";
});

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

      if (item.iso3 !== "COD" && item.iso3 !== "NGA") {
        option.disabled = true;
      }
      selector.append(option);
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  let countries = await fetchData();
  renderOptions(countries, country);
});
