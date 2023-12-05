const {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderNewPlayerForm,
  } = require('./script.js');
  
  describe('API calls', () => {
    it('fetches all players successfully', async () => {
      const players = await fetchAllPlayers();
      expect(players).toBeDefined();
      expect(Array.isArray(players)).toBe(true);
    });
  
    it('fetches a single player successfully', async () => {
      const playerId = any;
      const player = await fetchSinglePlayer(playerId);
      expect(player).toBeDefined();
      expect(player.id).toBe(playerId);
    });
  
    it('adds a new player successfully', async () => {
      const newPlayer = { name: 'TestPlayer', breed: 'TestBreed' };
      const response = await addNewPlayer(newPlayer);
      expect(response).toBeDefined();
      // Add more assertions based on the response if needed
    });
  
    it('removes a player successfully', async () => {
      const playerId = 1; // Assuming there is a player with ID 1 in your API
      await removePlayer(playerId);
      // You might want to fetch all players and ensure the player is removed
      const players = await fetchAllPlayers();
      const playerWithId = players.find((player) => player.id === playerId);
      expect(playerWithId).toBeUndefined();
    });
  });
  
  describe('Rendering functions', () => {
    it('renders players correctly', () => {
      const playerList = [
        { id: 1, name: 'Player1', breed: 'Breed1', status: 'Active', imageUrl: 'url1' },
        { id: 2, name: 'Player2', breed: 'Breed2', status: 'Inactive', imageUrl: 'url2' },
      ];
      const container = document.createElement('div');
      renderAllPlayers(playerList, container);
      // Add assertions based on the rendered HTML structure
    });
  
    it('renders new player form correctly', () => {
      const container = document.createElement('div');
      renderNewPlayerForm(container);
      // Add assertions based on the rendered HTML structure
    });
  });