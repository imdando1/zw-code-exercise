import React, { Component } from "react";
import ReactDOM from "react-dom";
import CONST from "./constants/constants";
import "./styles.scss";
import "./home.font";
import NewGame from "./components/NewGame";
import PlayGame from "./components/PlayGame";

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

    selectCharacter(characterType) {
        let selectedCharacter = characterType;
        this.setState({ selectedCharacter });
    }

    changeGameState(gameState) {
        let { game } = this.state;
        game.state = gameState;
        this.setState({ game });
    }

    render() {
        let view;

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
