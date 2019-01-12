import React, { Component } from "react";
import CONST from "../constants/constants";
import "../styles.scss";
import GithubKitty from "../images/github.svg";
import Android from "../images/android.svg";

class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            githubClassName: "",
            androidClassName: ""
        };
    }

    highlightCharacter(characterType) {
        var githubClassName = "";
        var androidClassName = "";
        console.log("highlighted");
        switch (characterType) {
            case CONST.CHARACTER.GITHUB:
                githubClassName = "highlight-character";
                androidClassName = "";
                break;
            case CONST.CHARACTER.ANDROID:
                githubClassName = "";
                androidClassName = "highlight-character";
                break;
        }
        this.setState({ githubClassName, androidClassName });
    }

    render() {
        return (
            <div className="newgame-container text-center">
                <h1>Pick your enemy</h1>
                <div>
                    <GithubKitty
                        className={`selection-box crosshair-pointer ${this.state.githubClassName}`}
                        onClick={() => {
                            this.props.selectCharacter(CONST.CHARACTER.GITHUB);
                            this.highlightCharacter(CONST.CHARACTER.GITHUB);
                        }}
                    />
                    <Android
                        className={`selection-box crosshair-pointer ${this.state.androidClassName}`}
                        onClick={() => {
                            this.props.selectCharacter(CONST.CHARACTER.ANDROID);
                            this.highlightCharacter(CONST.CHARACTER.ANDROID);
                        }}
                    />
                </div>

                <button
                    onClick={() => {
                        this.props.changeGameState(CONST.GAME_STATE.IN_PROGRESS);
                    }}
                >
                    PLAY GAME
                </button>
            </div>
        );
    }
}

export default NewGame;
