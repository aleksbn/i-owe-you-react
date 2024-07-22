/**
 * Renders a message indicating that the specified resource could not be found.
 *
 * @param {string} resourceName - The name of the missing resource
 * @return {JSX.Element} The JSX element displaying the message
 */
// eslint-disable-next-line react/prop-types
function Empty({ resourceName }) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
