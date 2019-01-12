import React, { Component } from "react";
import CONST from "../constants/constants";
import GithubKitty from "../images/github.svg";
import Android from "../images/android.svg";
import Character from "../components/Character";
import GameWon from "../components/GameWon";

class PlayGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameWon: false
        };
    }

    gameWon() {
        let { gameWon } = this.state;
        gameWon = true;
        this.setState({ gameWon });
    }

    render() {
        let characterToShow;

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
