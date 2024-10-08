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

  for (const category of categories) {
    const button = document.createElement("button");

    button.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "border",
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
      loadPetsByCategory(category.category);
    });

    categoryContainer.appendChild(button);
  }
}

function displayAllPets(petsData) {
  const pets = petsData.pets || petsData.data;
  // const categoryWisePets = petsData.data;

  const petsContainer = document.getElementById("pets_container");

  petsContainer.innerHTML = "";

  if (Array.isArray(pets) && pets.length > 0) {
    for (const pet of pets) {
      const div = document.createElement("div");

      div.classList.add("border", "p-5", "rounded-2xl", "space-y-5");

      div.innerHTML = `
                      <img class="w-full rounded-lg" src=${pet.image} alt="Pet Photo" />
                      <h5 class="text-2xl font-bold">${pet.pet_name}</h5>
    
                      <div class="space-y-2">
                        <div class="flex items-center justify-start gap-2">
                          <img class="size-5" src="/images/breed_icon.png" alt="" />
                          <span class="font-semibold">Breed: ${pet.breed}</span>
                        </div>
                        <div class="flex items-center justify-start gap-2">
                          <img class="size-5" src="/images/calendar_icon.png" alt="" />
                          <span class="font-semibold">Birth: ${pet.date_of}</span>
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
                        <button class="block px-3 py-1 rounded-lg border-2">
                          <img class="size-7" src="/images/thumbsup.png" alt="" />
                        </button>
                        <button
                           class="bg-primary border-2 border-primary hover:bg-white text-white hover:text-primary duration-200 px-6 py-3 rounded-lg font-medium"
                        >
                          Adopt
                        </button>
                        <button
                           class="bg-primary border-2 border-primary hover:bg-white text-white hover:text-primary duration-200 px-6 py-3 rounded-lg font-medium"
                        >
                          Details
                        </button>
                      </div>
                  `;

      petsContainer.appendChild(div);
    }
  } else {
    petsContainer.style.display = "none";
    
    const petNotFoundContainer = document.getElementById("no_pets_found");

    petNotFoundContainer.style.display = "block";

    petNotFoundContainer.innerHTML = `
                  <h2 class="text-center text-4xl font-bold">No Pets Found</h2>
                  <p class="text-center text-lg">Please check the category or try searching again.</p>
              `;
  }
}

loadCategories();
loadPets();
