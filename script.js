const playerContainer = document.getElementById("all-players-container");
const playerDetails = document.getElementById("player-details");
const newPlayerFormContainer = document.getElementById("new-player-form");
const cohortName = "2310-FSA-ET-WEB-PT-SF";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}players`);
    const { data } = await response.json();
    return data.players;
  } catch (err) {
    console.error("Trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`);
    const { data } = await response.json();
    displayPlayerDetails(data.player);
  } catch (err) {
    console.error(`Trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerObj),
    });
    return response.json();
  } catch (err) {
    console.error("Trouble adding player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    await fetch(`${APIURL}players/${playerId}`, { method: "DELETE" });
    await loadAndDisplayPlayers();
  } catch (err) {
    console.error(`Trouble removing player #${playerId}!`, err);
  }
};

const displayPlayerDetails = (player) => {
  playerDetails.innerHTML = `
        <img src="${player.imageUrl}" alt="${player.name}">
        <h3>${player.name}</h3>
        <p>Breed: ${player.breed}</p>
        <p>Status: ${player.status}</p>
    `;
};

const loadAndDisplayPlayers = async () => {
  const players = await fetchAllPlayers();
  let playerContainerHTML = players
    .map(
      (player) => `
        <div class="player-card">
            <img src="${player.imageUrl}" alt="${player.name}">
            <h3>${player.name}</h3>
            <p>Breed: ${player.breed}</p>
            <p>Status: ${player.status}</p>
            <button onclick="fetchSinglePlayer(${player.id})">See details</button>
            <button onclick="removePlayer(${player.id})">Remove from roster</button>
        </div>
    `
    )
    .join("");
  playerContainer.innerHTML = playerContainerHTML;
};

newPlayerFormContainer.innerHTML = `
    <form id="new-player" onsubmit="handleNewPlayer(event)">
        <input type="text" id="name" placeholder="Name" required>
        <input type="text" id="breed" placeholder="Breed" required>
        <button type="submit">Add New Player</button>
    </form>
`;

function handleNewPlayer(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const breed = document.getElementById("breed").value;
  addNewPlayer({ name, breed }).then(() => loadAndDisplayPlayers());
}

loadAndDisplayPlayers();
