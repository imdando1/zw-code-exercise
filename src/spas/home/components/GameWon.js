import React from "react";
import "../home.font";
import "../styles.scss";

/**
 * Winner UI.
 * I thought I use this page to express what type of beer I personally like
 * as well as leave a short thank you note. Thanks!
 */
const GameWon = props => {
    return (
        <div className="gamewon-container text-green text-center">
            <h1>
                Ok, enough of this. Time to drink some <span className="icon icon-beer" />
            </h1>
            <h3>IPAs? YES.</h3>
            <h2>Porters? YES.</h2>
            <h1>Stouts? YES.</h1>
            <h5>Bug light? hell NO.</h5>
            <p>Ok, well, joke aside...</p>
            <p>
                I just would like to thank you and your team for giving me an opportunity to work on something fun such
                as this challenge.
            </p>
            <p>
                Cheers! <span className="icon icon-beer" />
            </p>
        </div>
    );
};

export default GameWon;
