Evader.extend(
	'game.options',
	(function () {
		return {
			toggleDarkTheme() {
				const {
					misc: {
						gameOptions: { isDarkThemeEnabled },
					},
				} = Evader.state.getGameState();
				Evader.state.updateGameState([
					{ statePath: 'misc.gameOptions.isDarkThemeEnabled', newState: !isDarkThemeEnabled },
					{ statePath: 'updateType', newState: 'OPTIONS_DARK_THEME_TOGGLE' },
				]);
			},
			changeGameMode() {
				const {
					misc: {
						gameOptions: { gameMode },
					},
				} = Evader.state.getGameState();
				const newGameMode = gameMode === 'sprint' ? 'meditation' : 'sprint';
				Evader.state.updateGameState([
					{ statePath: 'misc.gameOptions.gameMode', newState: newGameMode },
					{ statePath: 'updateType', newState: 'OPTIONS_GAME_MODE_CHANGE' },
				]);
			},
			toggleRandomiser() {
				const {
					misc: {
						gameOptions: { isRandomiserEnabled },
					},
				} = Evader.state.getGameState();
				const newRandomiserState = Object.entries(isRandomiserEnabled).reduce((acc, curr) => {
					const [key, value] = curr;
					acc[key] = !value;
					return acc;
				}, {});
				Evader.state.updateGameState([
					{ statePath: 'misc.gameOptions.isRandomiserEnabled', newState: newRandomiserState },
					{ statePath: 'updateType', newState: 'OPTIONS_GAME_RANDOMISER_TOGGLE' },
				]);
			},
			clearPlayerStats() {
				Evader.state.updateGameState([{ statePath: 'updateType', newState: 'CLEAR_PLAYER_STATS' }]);
			},
			toggleGodMode() {
				const {
					game,
					misc: {
						gameOptions: { godMode },
					},
				} = Evader.state.getGameState();

				Evader.state.updateGameState([
					{
						statePath: 'misc.gameOptions.godMode.wasToggled',
						newState: !godMode.isActive || game.isInProgress,
					},
					{ statePath: 'misc.gameOptions.godMode.isActive', newState: !godMode.isActive },
					{ statePath: 'updateType', newState: 'OPTIONS_GOD_MODE_TOGGLE' },
				]);
			},
		};
	})()
);