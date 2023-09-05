// API: https://thronesapi.com/api/v2/Characters

async function onClickChange(id) {
    renderDetails(id)
}

async function main() {
    const characters = await fetch('https://thronesapi.com/api/v2/Characters')
    const charactersData = await characters.json()
    const charactersListElement = document.querySelector('.characters__list')
    // console.log(charactersData)
    charactersListElement.innerHTML = charactersData.map((character) => charactersListHTML(character)).join('')
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
        <p class="character__para">ID: ${character.id}</p>
        <p class="character__para">Name: ${character.fullName}</p>
    </div>`
}



function showCharacterDetail(detail) {
    if (!detail) {
        return `<div class="character__detail">Details not available</div>`;
    }
    return `
    <div class="character__detail">
    <p class="character__first--name">ID: ${detail.id}</p>
    <p class="character__first--name">First Name: ${detail.firstName || 'N/A'}</p>
    <p class="character__last--name">Last Name: ${detail.lastName || 'N/A'}</p>
    <p class="character__family">Full Name: ${detail.fullName || 'N/A'}</p>
    </div>
    `
}

/*
function charactersListHTML(character) {
    return `
    <div class="character" onclick="onClickChange(${character.id})">
        <p class="character__para">ID: ${character.id}</p>
        <p class="character__para">Name: ${character.fullName}</p>
    </div>`;
}

function showCharacterDetail(detail) {
    if (!detail) {
        return `<div class="character__detail">Details not available</div>`;
    }

    return `
    <div class="character__detail">
    <p class="character__first--name">First Name: ${detail.firstName || 'N/A'}</p>
    <p class="character__last--name">Last Name: ${detail.lastName || 'N/A'}</p>
    <p class="character__family">Full Name: ${detail.fullName || 'N/A'}</p>
    </div>`;
}
*/

main()