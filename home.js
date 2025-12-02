const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCatagory(json.categories));
};

const removeActive = () => {
  const plantsButtons = document.querySelectorAll(".plant-btn");
  plantsButtons.forEach((btn) => btn.classList.remove("active"));
};


const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("tree-container").classList.add("hidden");
  } else {
    document.getElementById("tree-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadTreesInfo = (id) => {

    manageSpinner(true);
  const url = "https://openapi.programming-hero.com/api/category/1";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {

        removeActive();
        const clickBtn = document.getElementById(`trees-btn-${id}`);
        console.log(clickBtn);
        clickBtn.classList.add("active");
        displayTreesInfo(data.plants);
    } );
};

const displayTreesInfo = (trees) => {
  const treesContainer = document.getElementById("trees-container");
  treesContainer.innerHTML = "";


  // category_name: "Evergreen Tree"
  // description: "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
  // id:1
  // image: "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
  // name: "Mango Tree"
  // price: 500

  trees.forEach((tree) => {
    console.log(tree);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="single-tree bg-white p-4 rounded-lg ">
          <img class="h-[186px] w-full object-cover rounded-lg" src="${tree.image}" alt="">
          <h4 onclick="my_modal_1.showModal()" class="my-3 font-semibold text-[14px]">${tree.name}</h4>
          <p class="text-[12px] text-[#1F2937]">${tree.description}</p>
          <div class="flex justify-between items-center mt-2 mb-3">
            <h4 class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-2xl">Fruit Tree</h4>
            <h4 class="font-semibold text-[14px]" >৳500</h4>
          </div>
          <button class="bg-[#15803D] text-white rounded-2xl py-3 px-28 hover:bg-[#FACC15]">Add to Cart</button>
        </div>

    `;
    treesContainer.append(card);
    
  });

   manageSpinner(false);
    return;
};

const displayCatagory = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";
  for (let categorie of categories) {
    console.log(categorie);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="trees-btn-${categorie.category_name}" onclick="loadTreesInfo('${categorie.category_name}')" class="py-2 pl-3 pr-40 rounded-md hover:bg-[#15803D] hover:text-white plant-btn">${categorie.category_name}</button>
        `;
    categoriesContainer.append(btnDiv);
  }
};

loadCatagories();
