// API: https://thronesapi.com/api/v2/Characters

async function onClickChange(id) {
    renderDetails(id)
}
const CHARACTERS_PER_PAGE = 10;
let currentPage = 1;
let lastPage = 6

async function main(page = 1) {
    
    const characters = await fetch('https://thronesapi.com/api/v2/Characters')
    const charactersData = await characters.json()
    
    const start = (page - 1) * CHARACTERS_PER_PAGE;
    const end = start + CHARACTERS_PER_PAGE;

    if (page < 1) {
        currentPage = 1
        return null
    }
    else if (page > lastPage) {
        currentPage = lastPage
        return null
    }

    const charactersToShow = charactersData.slice(start, end)
    
    const charactersListElement = document.querySelector('.characters__list')
    charactersListElement.innerHTML = charactersToShow.map((character) => charactersListHTML(character)).join('')
}

function changePage(direction) {
    currentPage += direction;
    main(currentPage);
}

async function renderDetails(characterId) {
    const details = await fetch('https://thronesapi.com/api/v2/Characters/' + characterId)
    const detailsData = await details.json()
    const detailsListElement = document.querySelector('.character__detail')
    detailsListElement.innerHTML = showCharacterDetail(detailsData)
}

function charactersListHTML(character) {
    return `
    <div class="character" onclick="onClickChange(${character.id})">
        <p class="character__para">Name: ${character.fullName} </p>
        <img class="character__img" src="https://thronesapi.com/assets/images/${character.image}">
    </div>`
}

function showCharacterDetail(detail) {
    if (!detail) {
        return `<div class="character__detail">Details not available</div>`;
    }
    return `
    <div class="character__detail">
    <img class="characters__second-half--img" src="https://thronesapi.com/assets/images/${detail.image}">
    <p class="character__first--name">First Name: ${detail.firstName || 'N/A'}</p>
    <p class="character__last--name">Last Name: ${detail.lastName || 'N/A'}</p>
    <p class="character__family">Full Name: ${detail.fullName || 'N/A'}</p>
    <p class="character__family">Title: ${detail.title}</p>
    <p class="character__family">Family: ${detail.family}</p>
    </div>
    `
}
if (document.querySelector('.characters__list')) {
    main(currentPage);
}