import { useState } from "react";
import { useUserData } from "../context/UserDataProvider";
import supabase from "../services/supabase";
import generateRandomPersons from "./data-persons";
import styled from "styled-components";
import Heading from "../ui/style/Heading";
import Button from "../ui/common/Button";
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

/**
 * Deletes payments associated with a specific user.
 *
 * @param {string} userData - The user data to identify the payments to delete.
 * @return {Promise<void>} - A promise that resolves after deleting the payments.
 */
async function deletePayments(userData) {
  const { error } = await supabase
    .from(`payments_${userData}`)
    .delete()
    .gt("id", 0);

  if (error) console.log(error);
}

/**
 * Deletes owings data for a specific user.
 *
 * @param {string} userData - The user data for whom the owings data will be deleted
 * @return {Promise<void>} - A Promise that resolves after deleting the owings data
 */
async function deleteOwings(userData) {
  const { error } = await supabase
    .from(`owings_${userData}`)
    .delete()
    .gt("id", 0);

  if (error) console.log(error);
}

/**
 * Deletes all persons associated with a specific user.
 *
 * @param {string} userData - The user data to identify the persons to delete.
 * @return {Promise<void>} - A promise that resolves after deleting the persons.
 */
async function deletePersons(userData) {
  const { error } = await supabase
    .from(`persons_${userData}`)
    .delete()
    .gt("id", 0);
  if (error) console.log(error.message);
}

/**
 * Creates persons data for a specific user.
 *
 * @param {string} userData - The user data to identify the persons to create.
 * @return {Promise<void>} - A promise that resolves after creating the persons data.
 */
async function createPersons(userData) {
  const persons = generateRandomPersons();
  const { error } = await supabase.from(`persons_${userData}`).insert(persons);
  if (error) console.log(error);
}

/**
 * Creates owings data for a specific user.
 *
 * @param {Array} persons - The array of persons for whom the owings are created.
 * @param {string} userData - The user data to identify the owings to create.
 * @return {Promise<void>} - A promise that resolves after creating the owings data.
 */
async function createOwings(persons, userData) {
  const owings = generateRandomOwings(persons);
  const { error } = await supabase.from(`owings_${userData}`).insert(owings);
  if (error) console.log(error);
}

/**
 * Asynchronously creates payments for a given user based on the provided owings data.
 *
 * @param {Array} owings - The owings data used to generate the payments.
 * @param {string} userData - The user data to identify the payments table to insert into.
 * @return {Promise<void>} - A Promise that resolves after the payments have been created, or logs an error if one occurs.
 */
async function createPayments(owings, userData) {
  const payments = generateRandomPayments(owings);
  const { error } = await supabase
    .from(`payments_${userData}`)
    .insert(payments);
  if (error) console.log(error);
}

/**
 * Retrieves persons data for a specific user.
 *
 * @param {string} userData - The user data to identify the persons.
 * @return {Promise<Array>} A promise that resolves to an array of persons data.
 */
async function getPersons(userData) {
  const persons = await supabase.from(`persons_${userData}`).select("*");
  return persons.data;
}

/**
 * Retrieves owings data for a specific user.
 *
 * @param {string} userData - The user data to identify the owings data.
 * @return {Array} An array of owings data.
 */
async function getOwings(userData) {
  const owings = await supabase.from(`owings_${userData}`).select("*");
  return owings.data;
}

function Uploader() {
  const { userData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Uploads all data to the server and updates the loading state accordingly.
   *
   * @return {Promise<void>} A promise that resolves when all data is uploaded.
   */
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

  /**
   * Deletes all persons, owings, and payments associated with the user.
   *
   * @return {Promise<void>} A promise that resolves when all deletions are complete.
   */
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
