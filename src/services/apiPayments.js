import supabase from "./supabase";

/**
 * Retrieves payments based on the provided userData and owingId.
 *
 * @param {string} userData - The user data for fetching payments.
 * @param {string} owingId - The owing ID for filtering payments.
 * @return {Object} An object containing data, error, and count of payments.
 */
export async function getPayments({ userData, owingId }) {
  if (owingId === "0") return { data: null, error: null, count: 0 };

  let query = supabase.from(`payments_${userData}`);
  query =
    owingId === "all"
      ? query.select("*", { count: "exact" }).order("dateOfPayment")
      : query
          .select("*", { count: "exact" })
          .eq("owingId", +owingId)
          .order("dateOfPayment");

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Payments could not be loaded");
  }

  return { data, error, count };
}

/**
 * Creates a new payment record in the database.
 *
 * @param {Object} options - The options for creating the payment.
 * @param {Object} options.newPayment - The details of the new payment.
 * @param {string} options.userData - The user data for fetching payments.
 * @return {Promise<Object>} - A promise that resolves to an object containing the created payment data and any error that occurred.
 * @throws {Error} - Throws an error if the payment could not be created.
 */
export async function createPayment({ newPayment, userData }) {
  let query = supabase.from(`payments_${userData}`);
  query = query.insert([{ ...newPayment }]);
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Payment could not be created");
  }

  return { data, error };
}

/**
 * Deletes a payment record from the database.
 *
 * @param {Object} options - The options for deleting the payment.
 * @param {string} options.id - The ID of the payment to be deleted.
 * @param {string} options.userData - The user data for fetching payments.
 * @return {Promise<void>} - A promise that resolves when the payment is deleted successfully, or rejects with an error if the deletion fails.
 * @throws {Error} - Throws an error if the payment could not be deleted.
 */
export async function deletePayment({ id, userData }) {
  const { error } = await supabase
    .from(`payments_${userData}`)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Owing could not be deleted");
  }
}

/**
 * Retrieves today's payments from the database for a specific user.
 *
 * @param {Object} options - The options for retrieving today's payments.
 * @param {string} options.userData - The user data for fetching payments.
 * @return {Promise<Object>} - A promise that resolves to an object containing the activities and any error that occurred.
 * @throws {Error} - Throws an error if today's activities could not be loaded.
 */
export async function getTodayPayments({ userData }) {
  const { data: payments, error: paymentsError } = await supabase
    .from(`payments_${userData}`)
    .select(`*, owings_${userData}(*)`);

  if (paymentsError) {
    console.error(paymentsError);
    throw new Error("Todays activities could not get loaded");
  }

  const activities = await Promise.all(
    payments
      .filter(
        (payment) =>
          new Date().toDateString() ===
          new Date(payment.dateOfPayment).toDateString()
      )
      .map(async (p) => {
        const owing = p[`owings_${userData}`];
        p["direction"] = owing.amount < 0 ? "tome" : "toother";
        const { data: person } = await supabase
          .from(`persons_${userData}`)
          .select("*")
          .eq("id", owing.personId)
          .single();
        p[
          "name"
        ] = `${person.firstName} ${person.lastName} (${person.nickname})`;
        return p;
      })
  );

  return { activities, paymentsError };
}
