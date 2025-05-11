const dob = document.getElementById("dob");
const submit = document.getElementById("submit");
submit.addEventListener("click", () => validate(dob));

function validate(dob) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  console.log(currentDay);

  const dobValue = new Date(dob.value);
  const dobDay = dobValue.getDate();
  const dobMonth = dobValue.getMonth();
  const dobYear = dobValue.getFullYear();
  console.log(dobDay);
  const yearDiff = currentYear - dobYear;
  const monthDiff = currentMonth - dobMonth;
  const dayDiff = currentDay - dobDay;

  if (
    (yearDiff > 19 && yearDiff < 54) ||
    (yearDiff === 19 && (monthDiff > 0 || (monthDiff == 0 && dayDiff >= 0))) ||
    (yearDiff === 54 && (monthDiff > 0 || (monthDiff == 0 && dayDiff >= 0)))
  ) {
    dob.setCustomValidity("");
  } else {
    dob.setCustomValidity("Age should be between 18 and 55");
    dob.reportValidity();
  }
}

let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsandConditions}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"><tr>
  
  <th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">Dob</th>
  <th class="px-4 py-2">Accepted terms?</th>
  </tr>${tableEntries}</table?`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsandConditions =
    document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsandConditions,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
