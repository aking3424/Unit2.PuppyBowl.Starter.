const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");
const cohortName = "2310-FSA-ET-WEB-PT-SF";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}players`);
    const { data } = await response.json();
    return data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`);
    const { data } = await response.json();
    console.log(data.player);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
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
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    await fetch(`${APIURL}players/${playerId}`, { method: "DELETE" });
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

const renderAllPlayers = (playerList) => {
  try {
    let playerContainerHTML = playerList
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
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

const renderNewPlayerForm = () => {
  try {
    const formHTML = `
            <form id="new-player">
                <input type="text" id="name" placeholder="Name" required>
                <input type="text" id="breed" placeholder="Breed" required>
                <button type="submit">Add New Player</button>
            </form>
        `;
    newPlayerFormContainer.innerHTML = formHTML;
    document
      .getElementById("new-player")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const breed = document.getElementById("breed").value;
        await addNewPlayer({ name, breed });
        const players = await fetchAllPlayers();
        renderAllPlayers(players);
      });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  renderNewPlayerForm();
};

init();
