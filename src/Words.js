
function Letter(props) {
    const l = <div className="letter">
    {props.letter}
    </div>;
    const setColor = (value) => {
        if (value === 1) {
            return <div className="square mx-3 yellow">
            {l}
            </div>
            
        }
        else if (value === 2) { 
            return <div className="square mx-3 green">
            {l}
            </div>
        }
        else {
            return <div className="square mx-3">
            {l}
            </div>
        }
    }
    return (
        <>{setColor(props.cv)}</>
        
    )
}

function Word(props) {
    
    const wordLen = props.word.length;
    const lettersArray = [];
    for (let i = 0; i < wordLen; i++) {
        lettersArray.push(<Letter cv = {props.correctValues[i]} letter={props.word[i]} key={i}></Letter>);
    }

    for (let i = wordLen; i < 5; i++) {
        lettersArray.push(<Letter cv = {props.correctValues[i]} letter={""} key={i}></Letter>);
    }

    return (
        <div className= "d-flex justify-content-center mb-3">
            {lettersArray}
        </div>
    )
}

function WordTables(props) {
    const arrSix = [0,1,2,3,4,5];
    return(
            <div>
                {arrSix.map( val => {
                    return <Word correctValues = {props.correctValues[val]} word={props.words[val]} key={val}></Word>
                }) 
                }
            </div>
    )
}

export {WordTables};