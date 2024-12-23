// console.log("video script added");
// 1 - Fetch, Load and Show categories on html

//Create loadCategories
const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

//Create displayCategories
const displayCategories = (data) => {
  //add Data inside HTML
  console.log(data);
};

loadCategories();
