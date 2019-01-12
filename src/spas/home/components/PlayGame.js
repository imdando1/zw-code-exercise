import React, { Component } from "react";
import CONST from "../constants/constants";
import GithubKitty from "../images/github.svg";
import Android from "../images/android.svg";
import Character from "../components/Character";
import GameWon from "../components/GameWon";

/**
 * This component handles the game-in-progress view. It either shows the character in motion
 * or the winning UI when the player wins.
 */
class PlayGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameWon: false
        };
    }

    /**
     * Event handler that gets triggered in the Character component.
     * It sets flats the gameWon state to true when the player wins.
     */
    gameWon() {
        let { gameWon } = this.state;
        gameWon = true;
        this.setState({ gameWon });
    }

    render() {
        let characterToShow;

        // passes selected character as a child element to the Character component.
        switch (this.props.selectedCharacter) {
            case CONST.CHARACTER.ANDROID:
                characterToShow = <Android className="character crosshair-pointer" />;
                break;
            case CONST.CHARACTER.GITHUB:
            default:
                characterToShow = <GithubKitty className="character crosshair-pointer" />;
                break;
        }
        return (
            <div className="playgame-container">
                {this.state.gameWon ? (
                    <GameWon />
                ) : (
                    <Character gameWon={this.gameWon.bind(this)}>{characterToShow}</Character>
                )}
            </div>
        );
    }
}

export default PlayGame;
