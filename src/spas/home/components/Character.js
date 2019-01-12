import React, { Component } from "react";

/**
 * This component handles all of the logic related to how the
 * character(again, I really should have named it enemy) handles.
 * It also handles the animation frame to keep the DOM updated as the state changes.
 */
class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HP: 100,
            dead: false,
            x: {
                position: 0,
                velocity: 5
            },
            y: {
                position: 0,
                velocity: 5
            },
            characterHeight: 100,
            characterWidth: 100,
            characterOpacity: 1
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    /**
     * Starts animation frame by calling the moveCharacter method recursively.
     */
    startAnimation() {
        this.requestId = requestAnimationFrame(() => this.moveCharacter());
    }

    /**
     * Stops the animation by passing the requestedId from when animation started.
     */
    stopAnimation() {
        cancelAnimationFrame(this.requestId);
    }

    /**
     * Moves the character(enemy).
     * Character has an x and y position for any given moment. It also has the
     * velocity(which is a speed with direction) that determines which direction and
     * how fast the character is moving.
     */
    moveCharacter() {
        if (!this.state.dead) {
            let { x, y } = this.state;
            x.position += x.velocity;
            y.position += y.velocity;
            this.hasCharacterTouchedBorder();
            this.setState({ x, y });
        } else {
            // TODO: move this to a separate method as this part of the code has nothing to do with the character movement.
            if (this.state.characterOpacity > 0) {
                let { characterOpacity } = this.state;
                characterOpacity -= 0.01;
                this.setState({ characterOpacity });
            } else {
                this.cancelAnimationFrame;
                this.props.gameWon();
            }
        }

        requestAnimationFrame(() => this.moveCharacter());
    }

    /**
     * Handles the logic when the player clicks on the character.
     */
    onAttack() {
        let { HP, dead } = this.state;
        HP -= 10;
        if (!HP) dead = true;
        this.setState({ HP, dead });
    }

    /**
     * Makes the character change direction when it hits the edge of the screen
     */
    hasCharacterTouchedBorder() {
        let { x, y } = this.state;

        // TODO: refactor to make this DRY.
        if (x.position + this.state.characterWidth > innerWidth || x.position < 0) {
            x.velocity *= -1;
            x.velocity = this.changeVelocity(x.velocity);
            y.velocity = this.changeVelocity(y.velocity);
            this.setState({ x });
        }

        if (y.position + this.state.characterHeight > innerHeight || y.position < 0) {
            y.velocity *= -1;
            y.velocity = this.changeVelocity(y.velocity);
            x.velocity = this.changeVelocity(x.velocity);
            this.setState({ y });
        }
    }

    /**
     * Changes the speed and direction of the character.
     * @param {number} currentVelocity
     */
    changeVelocity(currentVelocity) {
        var newVelocity = Math.random() * 5 + 3;
        if (currentVelocity < 0) newVelocity *= -1;
        return newVelocity;
    }

    render() {
        return (
            <div
                className="character-container"
                style={{
                    top: this.state.y.position,
                    left: this.state.x.position,
                    height: this.state.characterHeight + 10,
                    width: this.state.characterWidth
                }}
                onClick={() => {
                    this.onAttack();
                }}
            >
                <span className="crosshair-ponter" style={{ opacity: this.state.characterOpacity }}>
                    {this.props.children}
                </span>

                <div
                    style={{
                        height: 5,
                        width: this.state.HP + "%",
                        backgroundColor: "red"
                    }}
                />
            </div>
        );
    }
}

export default Character;
