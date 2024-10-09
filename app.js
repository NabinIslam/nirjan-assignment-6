function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(response => response.json())
    .then(categoryData => displayCategories(categoryData));
}

function loadPets() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(response => response.json())
    .then(petsData => displayAllPets(petsData));
}

function loadPetsByCategory(category) {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(response => response.json())
    .then(petsData => displayAllPets(petsData));
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

function displayAllPets(petsData) {
  const pets = petsData.pets || petsData.data;

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
                        <img class="w-full rounded-lg card_image" src=${pet.image} alt="Pet Photo" />
                        <h5 class="text-2xl font-bold">${pet.pet_name}</h5>
      
                        <div class="space-y-2">
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/breed_icon.png" alt="" />
                            <span class="font-semibold">Breed: ${pet.breed}</span>
                          </div>
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/calendar_icon.png" alt="" />
                            <span class="font-semibold">Birth: ${pet.date_of_birth}</span>
                          </div>
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/gender_icon.png" alt="" />
                            <span class="font-semibold">Gender: ${pet.gender}</span>
                          </div>
                          <div class="flex items-center justify-start gap-2">
                            <img class="size-5" src="/images/currency_icon.png" alt="" />
                            <span class="font-semibold">Price: ${pet.price}</span>
                          </div>
                        </div>
      
                        <hr />
      
                        <div class="flex items-center justify-between">
                          <button class="like_btn border-2 border-primary hover:border-gray-300 hover:bg-white text-white hover:text-primary duration-200 px-3 py-1 rounded-lg font-medium">
                            <img class="size-6 " src="/images/thumbsup.png" alt="" />
                          </button>
                          <button
                            class="bg-primary border-2 border-primary hover:bg-white text-white hover:text-primary duration-200 px-3 py-1 rounded-lg font-medium"
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

      const detailBtn = document.querySelectorAll(".detail_btn");

      detailBtn.forEach(button => {
        button.addEventListener("click", function () {
          const modal = document.getElementById("my_modal_1");

          const petPhoto = document.getElementById("pet_photo");
          const petName = document.getElementById("pet_name");
          const petBreed = document.getElementById("pet_breed");
          const petBirth = document.getElementById("pet_birth");
          const petGender = document.getElementById("pet_gender");
          const petPrice = document.getElementById("pet_price");
          const petStatus = document.getElementById("pet_status");

          petPhoto.src = pet.img;
          petName.innerText = pet.pet_name;

          modal.showModal();
        });
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

loadCategories();
loadPets();
