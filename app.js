function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(response => response.json())
    .then(categoryData => displayCategories(categoryData));
}

function loadPets() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(response => response.json())
    .then(petsData => displayAllPets(petsData.pets));
}

function loadPetsByCategory(category) {
  showLoading();

  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then(response => response.json())
      .then(petsData => {
        hideLoading();

        displayAllPets(petsData.data);
      });
  }, 2000);
}

function displayCategories(categoryData) {
  const categories = categoryData.categories;

  const categoryContainer = document.getElementById("category_container");

  let activeButton = null;

  for (const category of categories) {
    const button = document.createElement("button");

    button.classList.add(
      "border",
      "flex",
      "justify-center",
      "items-center",
      "basis-1/4",
      "gap-3",
      "py-10",
      "rounded-2xl"
    );

    button.innerHTML = `
                  <img class="size-[56px]" src=${category.category_icon} alt="Dog" />
                  <h5 class="font-black text-2xl">${category.category}</h5>
              `;

    button.addEventListener("click", function () {
      if (activeButton) {
        activeButton.classList.add("border-[#ddd]");
      }

      button.classList.add("border-primary");
      activeButton = button;

      loadPetsByCategory(category.category);
    });

    categoryContainer.appendChild(button);
  }
}

function displayAllPets(pets) {
  const petsContainer = document.getElementById("pets_container");
  const petNotFoundContainer = document.getElementById("no_pets_found");

  petsContainer.innerHTML = "";

  if (Array.isArray(pets) && pets.length > 0) {
    petsContainer.style.display = "grid";
    petNotFoundContainer.style.display = "none";

    for (const pet of pets) {
      const div = document.createElement("div");

      div.classList.add(
        "card_wrapper",
        "border",
        "p-5",
        "rounded-2xl",
        "space-y-5"
      );

      div.innerHTML = `
                        <img class="w-full rounded-lg card_image" src=${
                          pet.image ? pet.image : "Not Available"
                        } alt="Pet Photo" />
                        <h5 class="text-2xl font-bold">${
                          pet.pet_name ? pet.pet_name : "Not Available"
                        }</h5>
      
                        <div class="space-y-2">
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/breed_icon.png" alt="" />
                            <span class="font-semibold">Breed: ${
                              pet.breed ? pet.breed : "Not Available"
                            }</span>
                          </div>
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/calendar_icon.png" alt="" />
                            <span class="font-semibold">Birth: ${
                              pet.date_of_birth
                                ? pet.date_of_birth
                                : "Not Available"
                            }</span>
                          </div>
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/gender_icon.png" alt="" />
                            <span class="font-semibold">Gender: ${
                              pet.gender ? pet.gender : "Not Available"
                            }</span>
                          </div>
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/currency_icon.png" alt="" />
                            <span class="font-semibold">Price: ${
                              pet.price ? pet.price : "Not Available"
                            }</span>
                          </div>
                        </div>
      
                        <hr />
      
                        <div class="flex items-center justify-between">
                          <button class="like_btn border-2 border-primary hover:border-gray-300 hover:bg-white text-white hover:text-primary duration-200 px-3 py-1 rounded-lg font-medium">
                            <img class="size-6 " src="/images/thumbsup.png" alt="" />
                          </button>
                          <button
                            class="adopt_btn bg-primary border-2 border-primary hover:bg-white text-white hover:text-primary duration-200 px-3 py-1 rounded-lg font-medium"
                          >
                            Adopt
                          </button>
                          <button
                            class="detail_btn bg-primary border-2 border-primary hover:bg-white text-white hover:text-primary duration-200 px-3 py-1 rounded-lg font-medium"
                          >
                            Details
                          </button>
                        </div>
                  `;

      petsContainer.appendChild(div);

      const detailBtn = div.querySelector(".detail_btn");

      detailBtn.addEventListener("click", function () {
        const modal = document.getElementById("my_modal_1");
        modal.showModal();

        const modalContent = document.getElementById("modal_content");

        modalContent.innerHTML = `
          <img class='w-full h-auto' src=${pet.image} />
          <h3 class="text-3xl font-extrabold my-3">${
            pet.pet_name ? pet.pet_name : "Not Available"
          }</h3>
          <div class="grid grid-cols-2">
            <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/breed_icon.png" alt="" />
                            <span class="font-semibold">Breed: ${
                              pet.breed ? pet.breed : "Not Available"
                            }</span>
                          </div>
            <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/calendar_icon.png" alt="" />
                            <span class="font-semibold">Birth: ${
                              pet.date_of_birth
                                ? pet.date_of_birth
                                : "Not Available"
                            }</span>
                          </div>
                           <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/gender_icon.png" alt="" />
                            <span class="font-semibold">Gender: ${
                              pet.gender ? pet.gender : "Not Available"
                            }</span>
                          </div>
                           <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/currency_icon.png" alt="" />
                            <span class="font-semibold">Price: ${
                              pet.price ? pet.price : "Not Available"
                            }</span>
                          </div>
                           <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/gender_icon.png" alt="" />
                            <span class="font-semibold">Vaccinated status: ${
                              pet.vaccinated_status
                                ? pet.vaccinated_status
                                : "Not Available"
                            }</span>
                          </div>
          </div>
          <h6 class='text-xl font-bold mt-3 mb-2'>Details Information</h6>
          <p>${pet.pet_details ? pet.pet_details : "Not Available"}</p>
        `;
      });
    }

    const likeButtons = document.querySelectorAll(".like_btn");

    likeButtons.forEach(button => {
      button.addEventListener("click", function () {
        const cardWrapper = this.closest(".card_wrapper");
        const image = cardWrapper.querySelector(".card_image");

        const clonedImage = image.cloneNode(true);

        document.querySelector(".grid_container").appendChild(clonedImage);
      });
    });

    const adoptButton = document.querySelectorAll(".adopt_btn");

    adoptButton.forEach(button => {
      button.addEventListener("click", function () {
        let modal = document.getElementById("myModal");
        let counterElement = document.getElementById("counter");
        let counter = 3;

        modal.classList.remove("hidden");

        counterElement.innerText = counter;

        let countdown = setInterval(function () {
          counter--;
          counterElement.innerText = counter;

          if (counter === 0) {
            clearInterval(countdown);
            setTimeout(function () {
              modal.classList.add("hidden");
            }, 1000);
          }
        }, 1000);
      });
    });
  } else {
    petsContainer.style.display = "none";

    petNotFoundContainer.style.display = "block";

    petNotFoundContainer.innerHTML = `
              <div class='space-y-5 py-24'>
             <div> <img class="size-[160px] mx-auto" src="/images/n-a.png" alt="No Pets Found" /></div>
                  <h2 class="text-center text-4xl font-black">No Information Available</h2>
                  <p class="text-center text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
                    its layout. The point of using Lorem Ipsum is that it has a.</p>
              </div>    
              `;
  }
}

// Show loading indicator
function showLoading() {
  const petsContainer = document.getElementById("pets_container");
  petsContainer.style.display = "none";

  const petNotFoundContainer = document.getElementById("no_pets_found");
  petNotFoundContainer.style.display = "none";

  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");
}

// Hide loading indicator
function hideLoading() {
  const loading = document.getElementById("loading");
  loading.classList.add("hidden");
  const petsContainer = document.getElementById("pets_container");
  petsContainer.style.display = "block";
}

loadCategories();
loadPets();

document.getElementById("sort_by_price").addEventListener("click", function () {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(response => response.json())
    .then(petsData => {
      const pets = petsData.pets;

      pets.sort((a, b) => b.price - a.price);

      displayAllPets(pets);
    });
});
