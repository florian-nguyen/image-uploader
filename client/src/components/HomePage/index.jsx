import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import base_url from "../../axios";

import LoadingPage from "../LoadingPage";
import FinalPage from "../FinalPage";

import bgImg from "../../resources/image.svg";

const Container = styled.div`
	min-width: 350px;
	display: flex;

	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.75rem;

	margin: auto;
	padding: 3rem 2rem;
	color: #4f4f4f;
	background-color: white;

	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	border-radius: 12px;

	& * {
		margin: 0;
		padding: 0;
	}

	h1 {
		font-weight: 400;
		font-size: 1.5rem;
	}

	p {
		text-align: center;
		font-weight: 300;
		font-size: 0.7rem;
		padding: 1rem;
	}
`;

const Form = styled.div`
	width: 100%;
`;

const DragAndDropLabel = styled.label`
	display: block;
	width: 100%;

	position: relative;
	background-color: #f6f8fb;
	border: 1px dashed #97bef4;

	height: 200px;
	background-image: url(${bgImg});
	background-repeat: no-repeat;
	background-size: 50%;
	background-position: center;
	border-radius: 12px;

	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		opacity: 0.8;
	}

	&::after {
		display: block;
		margin-top: auto;
		position: absolute;
		bottom: 10px;
		left: 0;

		text-align: center;
		width: 100%;

		font-size: 0.7rem;
		color: #bdbdbd;
		font-weight: 500;
		content: "Drag & Drop your image here";
	}

	& input {
		padding: 0;
		margin: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		cursor: pointer;
	}
`;

const FileInfo = styled.div`
	text-align: center;
	font-weight: 300;
	font-size: 0.7rem;
	padding: 0.5rem;
`;

const Button = styled.button`
	width: 40%;
	border: 2px solid transparent;
	outline: none;
	padding: 0.75rem;
	border-radius: 12px;
	background-color: #2f80ed;
	color: white;
	font-weight: 600;
	font-size: 0.8rem;

	transition: all 0.3s ease-in-out 0.1s;
	cursor: pointer;

	&:hover {
		color: #2f80ed;
		background-color: #efefef;
		border: 2px solid #2f80ed;
		box-shadow: 0 4px 4px #2f80ed20;
	}
`;

const ButtonLabel = styled.label`
	width: 40%;
	border: 2px solid transparent;
	outline: none;
	padding: 0.75rem;
	border-radius: 12px;
	background-color: #2f80ed;
	color: white;
	font-weight: 600;
	font-size: 0.8rem;
	transition: all 0.3s ease-in-out;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		color: #2f80ed;
		background-color: #efefef;
		border: 2px solid #2f80ed;
		box-shadow: 0 4px 4px #2f80ed20;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	align-items: center;
`;

const Motion = styled(motion.div)`
	padding: 0;
	margin: 0;
	height: 100%;
	width: 100%;
`;
const HomePage = () => {
	const [file, setFile] = useState(null);
	const [serverFile, setServerFile] = useState(null);

	const [status, setStatus] = useState("home");

	const handleInputChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setStatus("empty");

		const formData = new FormData();
		formData.append("file", file);
		let url = encodeURI(base_url + `/api/v1/file/add`);

		setStatus("loading");
		await axios
			.post(url, formData)
			.then((res) => {
				// console.log(url);
				setServerFile(res.data);
				// console.log(res.data);
				setTimeout(() => {
					setStatus("empty");

					setTimeout(() => setStatus("done"), 750);
				}, 750);
			})
			.catch((error) => console.log(error));
	};

	return (
		<Container>
			<AnimatePresence>
				{status === "home" && (
					<Motion
						key="home"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						enter={{ opacity: 0 }}
						exit={{
							opacity: 0,
							height: 0,
							width: 0,
							overflow: "hidden",
							position: "absolute",
							transition: { duration: "0" },
						}}
						transition={{ duration: 1 }}
					>
						<h1>Upload your image</h1>
						<p>File should be .jpeg, .png, etc.</p>

						<Form action="" encType="multipart/form-data">
							<DragAndDropLabel type="file" htmlFor="file">
								<FileInfo>{file && `selected: ${file.name}`}</FileInfo>

								<input
									type="file"
									id="file"
									accept=".png,.jpg"
									onChange={handleInputChange}
								/>
							</DragAndDropLabel>

							<p>or</p>

							<ButtonContainer>
								<ButtonLabel htmlFor="file">Choose a file</ButtonLabel>

								<Button onClick={handleSubmit}>Send</Button>
							</ButtonContainer>
						</Form>
					</Motion>
				)}

				{status === "loading" && (
					<Motion>
						<LoadingPage
							key="loading"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							enter={{ opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1 }}
						/>
					</Motion>
				)}

				{status === "done" && (
					<Motion>
						<FinalPage
							key="done"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							enter={{ opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1 }}
							file={serverFile.file}
							path={`${base_url}/${serverFile.file.filename}`}
						/>
					</Motion>
				)}

				{status === "empty" && (
					<Motion
						key="empty"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						enter={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
					></Motion>
				)}
			</AnimatePresence>
		</Container>
	);
};

export default HomePage;
