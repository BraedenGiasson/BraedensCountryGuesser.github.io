/**
 * Game Name
 *
 * Authors
 *
 * Brief description
 *
 * Asset sources
 */

import GameStateName from "./enums/GameStateName.js";
import Game from "../lib/Game.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	fonts,
	images,
	keys,
	sounds,
	stateMachine,
	stateStack,
	timer,
} from "./globals.js";
import PlayState from "./states/PlayState.js";
import GameOverState from "./states/GameOverState.js";
import VictoryState from "./states/VictoryState.js";
import TitleScreenState from "./states/TitleScreenState.js";
import CountrySelectionState from "./states/CountrySelectionState.js";
import CorrectCountryState from "./states/CorrectCountryState.js";
import IncorrectCountryState from "./states/IncorrectCountryState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions,
} = await fetch('./src/config.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Add all the states to the state machine.
// stateMachine.add(GameStateName.TitleScreen, new TitleScreenState());
// stateMachine.add(GameStateName.GameOver, new GameOverState());
// stateMachine.add(GameStateName.Victory, new VictoryState());
// stateMachine.add(GameStateName.Play, new PlayState());
// stateMachine.add(GameStateName.CountrySelection, new CountrySelectionState());
// stateMachine.add(GameStateName.CorrectCountry, new CorrectCountryState());
// stateMachine.add(GameStateName.IncorrectCountry, new IncorrectCountryState());

stateStack.push(new TitleScreenState());
// stateStack.push(new PlayState());

// context.canvas.

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

const game = new Game(stateStack, context, timer, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
