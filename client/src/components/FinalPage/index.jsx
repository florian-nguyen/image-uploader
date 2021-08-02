import React, { useRef } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const Container = styled.div`
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
`;

const ImageWrapper = styled.div`
	width: 100%;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0;
`;

const Image = styled.div`
	width: 100%;
	height: 100%;
	min-height: 200px;
	background-size: auto 100%;
	background-position: center;
	background-repeat: no-repeat;

	border-radius: 10px;
`;

const InputContainer = styled.label`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	gap: 0.3rem;
	padding: 2px;

	background-color: #f6f8fb;
	border: 1px solid #e0e0e0;
	border-radius: 5px;

	& input {
		outline: none;
		border: none;

		width: 100%;

		font-family: inherit;
		font-weight: inherit;
		font-size: 0.6rem;
	}

	& button {
		/* position: absolute;
		right: 3px;
		height: 1.8rem; */

		border: none;
		outline: none;

		padding: 0.5rem;
		background-color: #2f80ed;
		color: white;

		font-size: 0.6rem;
		font-weight: 600;
		border-radius: 5px;

		transition: all 0.3s ease-in-out;

		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}
	}
`;

const FinalPage = ({ path }) => {
	const inputRef = useRef();

	const copyTextToClipboard = (e) => {
		const pathInput = inputRef.current;
		console.log(pathInput);
		pathInput.focus();
		pathInput.setSelectionRange(0, 99999);
		document.execCommand("copy");
		e.target.innerText = "Copied!";
		e.target.backgroundColor = "";
	};

	return (
		<Container>
			<FaCheckCircle style={{ fontSize: "2rem", color: "yellowgreen" }} />

			<ImageWrapper>
				<Image style={{ backgroundImage: `url(${path})` }} />
			</ImageWrapper>

			<InputContainer htmlFor="path">
				<input
					ref={inputRef}
					type="text"
					id="path"
					name="path"
					value={path}
					readOnly
				/>
				<button onClick={copyTextToClipboard}>Copy Link</button>
			</InputContainer>
		</Container>
	);
};

export default FinalPage;
