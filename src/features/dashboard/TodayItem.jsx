/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/style/Tag";
import { formatCurrency } from "../../utilities/helpers";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 7rem 10rem 30rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const StyledAmount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-grey-800);
  padding-left: 2rem;
  padding-right: 2rem;
`;

const StyledName = styled.div`
  color: var(--color-grey-800);
  font-size: 1.6rem;
  font-weight: 600;
`;

/**
 * Renders a TodayItem component that displays the activity's direction, amount, and name.
 *
 * @param {Object} activity - The activity object containing direction, amount, and name.
 * @return {JSX.Element} The rendered TodayItem component.
 */
function TodayItem({ activity }) {
  const { direction, amount, name } = activity;

  return (
    <StyledTodayItem>
      <Tag type={`${direction === "tome" ? "green" : "red"}`}>
        {direction === "tome" ? "Receiving" : "Paying"}
      </Tag>
      <StyledAmount>{formatCurrency(+amount)}</StyledAmount>
      <StyledName>{name}</StyledName>
    </StyledTodayItem>
  );
}

export default TodayItem;
