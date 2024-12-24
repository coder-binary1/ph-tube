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
//Create loadVideos
const loadVideos = (searchText = "") => {
  //fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //remove previous active class from button
      removeActiveClass();
      // add active class to the clicked button
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
};

const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};
const displayDetails = (video) => {
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img src="${video.thumbnail}">
  <p class="pt-3">${video.description}</p>
  `;
  // way-1
  // document.getElementById("showModalData").click();
  //way-2
  document.getElementById("customModal").showModal();
};
//get Hour and rest seconds
function getTimeString(time) {
  const hours = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `
  ${hours} ${hours <= 1 ? "Hour" : "Hours"} ${minute} ${
    minute <= 1 ? "Minute" : "Minutes"
  } ${remainingSeconds} ${remainingSeconds <= 1 ? "second" : "seconds"}
  `;
}

const removeActiveClass = () => {
  const button = document.getElementsByClassName("category-btn");
  for (const btn of button) {
    btn.classList.remove("active");
  }
};

//Create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  //add Data inside HTML
  categories.forEach((element) => {
    // console.log(element);

    //create a button
    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = element.category;
    // button.onclick = () => {alert('hello')}

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${element.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${element.category_id})">
    ${element.category}
    </button>
    `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

// Create displayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[500px] flex flex-col gap-5 justify-center items-center">
      <img src="assets/Icon.png">
      <h2 class="text-2xl font-bold">No Content Here in this category</h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((element) => {
    // console.log(element);

    const card = document.createElement("div");
    card.classList = "card card-compact rounded shadow-sm";
    card.innerHTML = `
    <figure class='h-[200px] rounded-md relative'>
      <img
        src=${element.thumbnail}
        class='h-full w-full object-cover'
        alt="Shoes" />
        ${
          element.others.posted_date?.length == 0
            ? ""
            : `<span class="absolute font-bold text-xs right-2 bottom-2 bg-black text-white rounded p-1">
            ${getTimeString(element.others.posted_date)} </span>`
        }
        
    </figure>
    <div class="px-0 py-2 flex gap-2">
      <div>
        <img class="w-10 h10 rounded-full object-cover" src=${
          element.authors[0].profile_picture
        }>
      </div>
      <div>
        <h2 class="font-bold">${element.title}</h2>
        <div class="flex items-center gap-2">
          <p class="text-gray-400">${element.authors[0].profile_name}</p>
          ${
            element.authors[0].verified === true
              ? `<img class='w-5' src='https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000'>`
              : ""
          }
          
         </div>
        <p class="text-gray-400"">${element.others.views} </p>
        <button class="btn btn-sm btn-error text-white my-3" onclick="loadDetails('${
          element.video_id
        }')">Details</button>
      </div>
    </div>
    
    `;
    videoContainer.append(card);
  });
};

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

// call the functions
loadCategories();
loadVideos();
