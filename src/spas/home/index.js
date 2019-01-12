import React, { Component } from "react";
import ReactDOM from "react-dom";
import CONST from "./constants/constants";
import "./styles.scss";
import "./home.font";
import NewGame from "./components/NewGame";
import PlayGame from "./components/PlayGame";

/**
 * Top level component for the app.
 */
class HomeSPA extends Component {
    constructor() {
        super();
        this.state = {
            game: {
                state: CONST.GAME_STATE.NEW_GAME
            },
            selectedCharacter: CONST.CHARACTER.GITHUB
        };
    }

    /**
     * Updates the state with the selected character.
     * @param {string} characterType - Selected character type.
     */
    selectCharacter(characterType) {
        let selectedCharacter = characterType;
        this.setState({ selectedCharacter });
    }

    /**
     * Changes and updates the state of the game.
     * @param {string} gameState - game state type such as "New Game" and "Game in progress"
     */
    changeGameState(gameState) {
        let { game } = this.state;
        game.state = gameState;
        this.setState({ game });
    }

    render() {
        let view;

        // depending on the state of the game, it renders appropriate view.
        switch (this.state.game.state) {
            case CONST.GAME_STATE.IN_PROGRESS:
                view = (
                    <PlayGame
                        selectedCharacter={this.state.selectedCharacter}
                        changeGameState={this.changeGameState.bind(this)}
                    />
                );
                break;
            case CONST.GAME_STATE.NEW_GAME:
            default:
                view = (
                    <NewGame
                        selectCharacter={this.selectCharacter.bind(this)}
                        changeGameState={this.changeGameState.bind(this)}
                    />
                );
                break;
        }

        return view;
    }
}

ReactDOM.render(<HomeSPA />, document.getElementById("react-spa"));
