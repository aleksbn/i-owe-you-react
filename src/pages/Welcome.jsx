/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import Heading from "../ui/style/Heading";

const StyledWelcomeContainer = styled.div`
  margin: 2rem auto;
  text-align: center;
  width: 100%;

  & p {
    text-align: left;
    padding: 4rem 0;
    font-size: 2rem;
  }
`;

/**
 * Renders a welcome page for the IOU app.
 *
 * @return {JSX.Element} The welcome page component.
 */
function Welcome() {
  return (
    <StyledWelcomeContainer>
      <Heading as="h1">Welcome to IOU: Keep Track of What's Owed</Heading>
      <p>
        Are you tired of the hassle of tracking who owes you, or who you owe?
        Say goodbye to sticky notes and forgotten debts, and welcome to IOU -
        your personalized solution for managing all your borrowings and
        lendings.
      </p>
      <Heading as="h2">Effortless Organization</Heading>
      <p>
        With IOU, you can effortlessly organize and monitor all your financial
        transactions with friends, family, or colleagues. Whether it's borrowing
        money for a lunch date or lending a helping hand, IOU keeps everything
        in one convenient place.
      </p>
      <Heading as="h2">Personalized Profiles</Heading>
      <p>
        Create personalized profiles for each individual you transact with. Add
        their name, contact details, a nickname, and even a personal image to
        easily identify them.
      </p>
      <Heading as="h2">Track Both Ways</Heading>
      <p>
        IOU lets you track both sides of the coin. Record what you owe to others
        and what others owe to you, all with detailed records of dates and
        payments.
      </p>
      <Heading as="h2">Clear and Insightful Dashboards</Heading>
      <p>
        Gain valuable insights into your financial relationships with our
        intuitive dashboard. Get a snapshot of your current debts, visualize
        trends with line charts, and understand your lending and borrowing
        habits with pie charts.
      </p>
      <Heading as="h2">Customizable Filtering</Heading>
      <p>
        Filter your data by time frame or repayment status to focus on what
        matters most to you. Whether it's the past week, month, or year, or
        distinguishing between fully repaid debts and outstanding balances, IOU
        puts you in control.
      </p>
      <Heading as="h2">Start Simplifying Your Finances Today</Heading>
      <p>
        Join thousands of users who have taken control of their finances with
        IOU. Download now and experience the ease and convenience of managing
        your borrowings and lendings like never before.
      </p>
      <Heading as="h2">Try It Before Using It</Heading>
      <p>
        With our easy system for generating test data and easily removing it
        once you make up your mind, you can test the app before deciding to
        actually invest time in it.
      </p>
    </StyledWelcomeContainer>
  );
}

export default Welcome;
