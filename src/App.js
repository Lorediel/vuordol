import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { WordTables } from "./Words.js";
import { Button } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import words_list from "./words_list.js";

// #282C34 #F6AE2D #7E78D2 #B0FE76 #B6B8D6 #FE5F55

function App() {
	const [currentWord, setCurrentWord] = useState(0);
	const [currentLetter, setCurrentLetter] = useState(0);
	const [correctValues, setCorrectValues] = useState(
		[...Array(6)].map((v) => [0, 0, 0, 0, 0])
	);
	const [words, setWords] = useState(["", "", "", "", "", ""]);
	const [started, setStarted] = useState(false);
	const [win, setWin] = useState(0);
	const [guess, setGuess] = useState();

	useEffect(() => {
		const list_length = words_list.length;
		const index = Math.floor(Math.random() * list_length);
		setGuess(words_list[index]);
	}, [started]);

	const compareChars = (word1, word2) => {
		//array to see if a character of word1 is inside word2
		// 0 - not ok, 1 - ok but not in position, 2 - ok in position
		let is_inside = [...Array(word1.length)].map((v) => 0);
		word1.split("").forEach((char, charIndex) => {
			const index = word2.indexOf(char);
			if (index > -1) {
				is_inside[charIndex] = 1;
				if (word2[charIndex] === char) {
					is_inside[charIndex] = 2;
				}
			}
		});
		return is_inside;
	};

	const handleEnter = () => {
		if (!win) {
			if (currentLetter === 5) {
				//Vedi se la parola è giusta e blablabla
				if (words[currentWord] === guess) {
					setWin(1);
				}
				const is_inside_array = compareChars(words[currentWord], guess);
				setCorrectValues((oldList) => {
					const list = oldList.map((values, j) => {
						if (currentWord === j) {
							return is_inside_array;
						} else {
							return values;
						}
					});
					return list;
				});
				if (currentWord === 5 && words[currentWord] !== guess) {
					setWin(-1);
					return;
				}
				setCurrentLetter(0);
				setCurrentWord((oldWordIndex) => oldWordIndex + 1);
			}
		}
	};

	const handleRestartButton = (event) => {
		setStarted(false);
		setWords(["", "", "", "", "", ""]);
		setCorrectValues([...Array(6)].map((v) => [0, 0, 0, 0, 0]));
		setCurrentLetter(0);
		setCurrentWord(0);
		setWin(0);
	};

	const handleOnClick = (event) => {
		if (!win) {
		setStarted(true);
		}
		
	};

	const handleKeyDown = (event) => {
		const letter = event.key;
		if (!win) {
			if (letter === "Enter") {
				handleEnter();
				return;
			}

			if (letter === "Backspace" && currentLetter !== 0) {
				setWords((oldList) => {
					const list = oldList.map((w, j) => {
						if (currentWord === j) {
							setCurrentLetter((c) => {
								return c - 1;
							});
							return words[currentWord].slice(
								0,
								currentLetter - 1
							);
						} else {
							return w;
						}
					});
					return list;
				});
			}

			if (
				letter.toUpperCase() === letter.toLowerCase() ||
				letter.length !== 1
			) {
				return;
			}

			if (currentLetter !== 5) {
				setWords((oldList) => {
					const list = oldList.map((w, j) => {
						if (currentWord === j) {
							const cl = currentLetter;
							setCurrentLetter((c) => {
								return c + 1;
							});
							return (
								words[currentWord].slice(0, cl) +
								letter.toUpperCase() +
								words[currentWord].slice(cl + 1)
							);
						} else {
							return w;
						}
					});
					return list;
				});
			}
		}
	};

	return (
		<div tabIndex={0} onKeyDown={handleKeyDown} onClick={handleOnClick} className="noborder">
			<Container className="bg pt-2">
				{started ? (
					<>
					<div className="d-flex justify-content-center">
						<h1 className="logo">Vuordol</h1>
					</div>
						<Row className="pt-3">
							<Col md={3}>
								<Rules></Rules>
							</Col>
							<Col md={6}>
								<WordTables
									words={words}
									correctValues={correctValues}
								></WordTables>
							</Col>
							<Col md={3}></Col>
						</Row>
						<Outcome
							win={win}
							handleRestartButton={handleRestartButton}
							guess={guess}
						></Outcome>
					</>
				) : (
					<StartScreen></StartScreen>
				)}
			</Container>
		</div>
	);
}

function StartScreen() {
	return (
		<>
			<Row className="vh-100">
				<Col md={3} />
				<Col md={6} className="my-auto">
					<h1 className="d-flex justify-content-center homeWriting">
						Click to start
					</h1>
				</Col>
				<Col md={3} />
			</Row>
		</>
	);
}

function Outcome(props) {
	const to_disp = (winValue) => {
		if (winValue === 0) {
			return false;
		} else if (winValue === 1) {
			return (
				<div className="d-flex justify-content-center outcomeWriting greenText">
					<h1>YOU WON!</h1>
				</div>
			);
		} else if (winValue === -1) {
			return (
				<div className="d-flex justify-content-center outcomeWriting redText">
					<h1>YOU LOST!</h1>
				</div>
			);
		}
	};

	return (
		<>
			<Row>
				<Col md={3}></Col>
				<Col md={6} className="my-auto">
					{to_disp(props.win)}
				</Col>
				<Col md={3}></Col>
			</Row>

			{props.win ? (
				<>
					<Row>
						<Col md={3}></Col>
						<Col md={6} className="my-auto ">
							<div className="d-flex justify-content-center">
								<Button
									onClick={props.handleRestartButton}
									className="playAgainButton"
									size="lg"
								>
									Play again
								</Button>
							</div>
						</Col>
						<Col md={3}></Col>
					</Row>
					<Row>
						<Col md={3}></Col>
						<Col md={6}>
							<div className="d-flex justify-content-center homeWriting mt-1">
								<h5>The word was: {props.guess}</h5>
							</div>
							;
						</Col>
						<Col md={3}></Col>
					</Row>
				</>
			) : (
				false
			)}
		</>
	);
}

function Rules() {
	return (
		<>
		<h1>Rules</h1>
		<p>Guess the correct word. Write a 5 letter word and press <b>Enter</b>, if the letter is in the word it will
		light up <b className="yellowText">Yellow</b>, if not only it is in the word but is in the correct spot, it will
		light up <b className="greenText">Green</b>.</p>
		<p>You only have 6 attempts, good luck!</p>
		</>
	)
}

export default App;
