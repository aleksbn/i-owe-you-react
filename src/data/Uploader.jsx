import { useState } from "react";
import { useUserData } from "../context/UserDataProvider";
import supabase from "../services/supabase";
import generateRandomPersons from "./data-persons";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import generateRandomOwings from "./data-owings";
import generateRandomPayments from "./data-payments";

const StyledSampleData = styled.div`
	margin-top: auto;
	background-color: var() (--color-grey-0);
	border: 1px solid var(--color-grey-200);
	padding: 7px;
	border-radius: 5px;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

async function deletePayments(userData) {
	const { error } = await supabase
		.from(`payments_${userData}`)
		.delete()
		.gt("id", 0);

	if (error) console.log(error);
}

async function deleteOwings(userData) {
	const { error } = await supabase
		.from(`owings_${userData}`)
		.delete()
		.gt("id", 0);

	if (error) console.log(error);
}

async function deletePersons(userData) {
	const { error } = await supabase
		.from(`persons_${userData}`)
		.delete()
		.gt("id", 0);
	if (error) console.log(error.message);
}

async function createPersons(userData) {
	const persons = generateRandomPersons();
	const { error } = await supabase.from(`persons_${userData}`).insert(persons);
	if (error) console.log(error);
}

async function createOwings(persons, userData) {
	const owings = generateRandomOwings(persons);
	const { error } = await supabase.from(`owings_${userData}`).insert(owings);
	if (error) console.log(error);
}

async function createPayments(owings, userData) {
	const payments = generateRandomPayments(owings);
	const { error } = await supabase
		.from(`payments_${userData}`)
		.insert(payments);
	if (error) console.log(error);
}

async function getPersons(userData) {
	const persons = await supabase.from(`persons_${userData}`).select("*");
	return persons.data;
}

async function getOwings(userData) {
	const owings = await supabase.from(`owings_${userData}`).select("*");
	return owings.data;
}

function Uploader() {
	const { userData } = useUserData();
	const [isLoading, setIsLoading] = useState(false);

	async function uploadAll() {
		setIsLoading(true);
		await deletePersons(userData);
		await createPersons(userData);

		const personsFromDatabase = await getPersons(userData);
		await deleteOwings(userData);
		await createOwings(personsFromDatabase, userData);

		const owingsFromDatabase = await getOwings(userData);
		await deletePayments(userData);
		await createPayments(owingsFromDatabase, userData);

		setIsLoading(false);
	}

	async function deleteAll() {
		setIsLoading(true);
		await deletePersons(userData);
		await deleteOwings(userData);
		await deletePayments(userData);
		setIsLoading(false);
	}

	return (
		<StyledSampleData>
			<Heading as="h2">Sample data</Heading>
			<Heading as="h3">(reload necessary)</Heading>
			<Button onClick={uploadAll} disabled={isLoading}>
				Upload all
			</Button>
			<Button onClick={deleteAll} disabled={isLoading}>
				Delete all
			</Button>
		</StyledSampleData>
	);
}

export default Uploader;
