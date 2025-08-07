// Load Navbar Category
const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategory(data.categories);
}

// Load All Pet Details
const loadAllPets = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    displayAllPets(data.pets);
}

// Load Pet By Category.
const loadPetByCategory = async (id) => {
    // console.log(data);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
    const data = await res.json();
    displayAllPets(data.data);
}

// Load Pet Details (Modal)
const loadPetDetailsModal = async(petID) => {
    // console.log(petID);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`);
    const data = await res.json();
    displayPetDetailsByModal(data.petData);
}

// Click The Like Button And Pin The Pet Photo on Right Side.
const petYouLike = ('clike', (petImage) => {
    // console.log(petImage)
    const photoArea = document.getElementById('pet-you-like');
    const imageDiv = document.createElement('div');
    imageDiv.innerHTML =`<div class="card block like-card bg-base-100">
                        <figure class="w-[135px] h-[80px]">
                            <img src="${petImage}"
                                alt="Shoes" />
                        </figure>
                    </div> `
    photoArea.appendChild(imageDiv);
}) 

// Display Pet Details Via Modal
const displayPetDetailsByModal = (details) => {
    console.log(details);
    const modalBox = document.getElementById('pet-details-modal-box');
    modalBox.innerHTML = `<form method="dialog">
                        <button class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <img src="${details.image || 'No Photo Found'}" alt="pet-image" style="width: 100%; hight: auto;">
                        <h1 class="text-2xl font-bold">${details.pet_name || 'No Data'}</h1>
                        <div class="flex justify-around">
                            <div class="">
                                <p><i class="fa-brands fa-slack"></i> Breed: ${details.breed || 'No Data'}</p>
                                <p><i class="fa-solid fa-calendar-days"></i> Birth: ${details.date_of_birth || 'No Data'}</p>
                            </div>
                            <div class="">
                                <p><i class="fa-solid fa-venus"></i> Gender: ${details.gender || 'No Data'}</p>
                                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${details.price || 'No Data'}</p>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <h1 class="text-2xl font-semibold">Details Information</h1>
                        <p>${details.pet_details}</p>
                    </div>`
                    document.getElementById('pet-details-modal-btn').click();

}

// Display Navbar Category.
const displayCategory = (data) => {
    const btnSection = document.getElementById('dynamicNav');
    for (const category of data) {
        // console.log(category)
        const divBtn = document.createElement('div');
        divBtn.innerHTML = `<button onClick="loadPetByCategory('${category.category}')" class="btn navBtn">
                                <img class="btnIcon" src="${category.category_icon}" alt="category-logo">
                                ${category.category}
                            </button>`;
        btnSection.appendChild(divBtn);
    }
}

// Display All pets.
const displayAllPets = (pets) => {
    // console.log(data)
    const petsCardSection = document.getElementById('pet-card-section');
    petsCardSection.innerHTML = " ";

    if (pets.length === 0) {
        petsCardSection.classList.remove("grid");
        petsCardSection.innerHTML = `<div class="error-div flex justify-center items-center pb-20">
                <div class="grid justify-items-center">
                    <img src="images/error.webp" />
                <h1 class="text-2xl font-bold">No Information Available</h1>
                </div>
            </div>`
            return;
    } else {
        petsCardSection.classList.add("grid");
    }

    for (const pet of pets) {
        // console.log(pet)
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div class="card pet-card bg-base-100 shadow-sm">
                        <figure>
                            <img src="${pet.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${pet.pet_name || 'Data Not Found'}</h2>
                            <p><i class="fa-brands fa-slack"></i> Breed: ${pet.breed || 'Data Not Found'}</p>
                            <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth || 'Data Not Found'}</p>
                            <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender || 'Data Not Found'}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price || 'Data Not Found'}</p>
                            <div class="card-actions ">
                                <button class="btn " onClick="petYouLike('${pet.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
                                <button class="btn ">Adopt</button>
                                <button class="btn " onClick="loadPetDetailsModal('${pet.petId}')">Details</button>
                            </div>
                        </div>
                    </div> `
        petsCardSection.appendChild(cardDiv);
    }

}



loadCategory();
loadAllPets();