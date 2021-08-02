import styled from "styled-components";
import HomePage from "./components/HomePage";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	overflow: hidden;

	background-color: #fafafb;
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3rem;
	width: 100%;
	font-family: "Montserrat", sans-serif;
	font-size: 0.9rem;
	font-weight: 500;

	& a {
		text-decoration: none;
		font-weight: 700;
		color: orangered;
	}
`;

function App() {
	return (
		<Container>
			<HomePage />
			<Footer>
				<p>
					created by{" "}
					<a href="https://devchallenges.io/portfolio/florian-nguyen">
						Florian NGUYEN
					</a>{" "}
					- devChallenges.io
				</p>
			</Footer>
		</Container>
	);
}

export default App;
