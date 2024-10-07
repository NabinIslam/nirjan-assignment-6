fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then(response => response.json())
  .then(categoryData => displayCategories(categoryData));

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

    categoryContainer.appendChild(button);
  }
}

fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then(response => response.json())
  .then(petsData => displayCategories(petsData));

function displayAllPets(petsData) {
  const pets = petsData.pets;

  const petContainer = document.getElementById("pets_container");

  for (const pet of pets) {
    const div = document.createElement("div");

    div.classList.add("border", "p-5", "rounded-2xl", "space-y-5");

    div.innerHTML = `
                  <img src="/images/card_img.png" alt="Pet Photo" />
                  <h5 class="text-2xl font-bold">Mister Tartosn</h5>

                  <div class="space-y-2">
                    <div class="flex items-center justify-start gap-2">
                      <img class="size-5" src=${pet.image} alt="" />
                      <span class="font-semibold">Breed: ${pet.breed}</span>
                    </div>
                    <div class="flex items-center justify-start gap-2">
                      <img class="size-5" src="/images/breed_icon.png" alt="" />
                      <span class="font-semibold">Breed: Golder Retriever</span>
                    </div>
                    <div class="flex items-center justify-start gap-2">
                      <img class="size-5" src="/images/breed_icon.png" alt="" />
                      <span class="font-semibold">Breed: Golder Retriever</span>
                    </div>
                    <div class="flex items-center justify-start gap-2">
                      <img class="size-5" src="/images/breed_icon.png" alt="" />
                      <span class="font-semibold">Breed: Golder Retriever</span>
                    </div>
                  </div>

                  <hr />

                  <div class="flex items-center justify-between">
                    <button class="block px-3 py-1 rounded-lg border-2">
                      <img class="size-7" src="/images/thumbsup.png" alt="" />
                    </button>
                    <button
                      class="font-bold text-lg text-primary block px-3 py-1 rounded-lg border-2"
                    >
                      Adopt
                    </button>
                    <button
                      class="font-bold text-lg text-primary block px-3 py-1 rounded-lg border-2"
                    >
                      Details
                    </button>
                  </div>
              `;

    categoryContainer.appendChild(div);
  }
}
