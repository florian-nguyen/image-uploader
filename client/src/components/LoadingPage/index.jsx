import React from "react";
import styled from "styled-components";
import { BarLoader } from "react-spinners";

const Container = styled.div`
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
`;

const LoadingWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoadingPage = () => {
	return (
		<Container>
			<h1>Uploading...</h1>
			<LoadingWrapper>
				<BarLoader height={"3px"} width={"100%"} color="#2F80ED" />
			</LoadingWrapper>
		</Container>
	);
};

export default LoadingPage;
