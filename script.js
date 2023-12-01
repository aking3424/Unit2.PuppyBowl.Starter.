const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');
const cohortName = '2310-FSA-ET-WEB-PT';
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}players`);
        const { data } = await response.json();
        return data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};
const removePlayer = async (playerId) => {
    try {
        await fetch(`${APIURL}players/${playerId}`, { method: 'DELETE' });
    } catch (err) {
        console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
    };
    
const renderAllPlayers = (playerList) => {
    try {
        let playerContainerHTML = playerList.map(player => `
            <div class="player-card">
                <img src="${player.imageUrl}" alt="${player.name}">
                <h3>${player.name}</h3>
                <p>Breed: ${player.breed}</p>
                <p>Status: ${player.status}</p>
                <button onclick="fetchSinglePlayer(${player.id})">See details</button>
                <button onclick="removePlayer(${player.id})">Remove from roster</button>
            </div>
        `).join('');
        playerContainer.innerHTML = playerContainerHTML;
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};
