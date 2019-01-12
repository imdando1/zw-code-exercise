import React, { Component } from "react";

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

    startAnimation() {
        this.requestId = requestAnimationFrame(() => this.moveCharacter());
    }

    stopAnimation() {
        cancelAnimationFrame(this.requestId);
    }

    moveCharacter() {
        if (!this.state.dead) {
            let { x, y } = this.state;
            x.position += x.velocity;
            y.position += y.velocity;
            this.hasCharacterTouchedBorder();
            this.setState({ x, y });
        } else {
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

    onAttack() {
        let { HP, dead } = this.state;
        HP -= 10;
        if (!HP) dead = true;
        this.setState({ HP, dead });
    }

    hasCharacterTouchedBorder() {
        let { x, y } = this.state;

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
