import styled from 'styled-components';

interface ChartProps {
  type: 'donut' | 'bar';
  title: string;
}

const Chart = ({ type, title }: ChartProps) => {
  return (
    <ChartWrapper>
      <h3>{title}</h3>
      <ChartPlaceholder>{type} Chart</ChartPlaceholder>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const ChartPlaceholder = styled.div`
  width: 200px;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 10px;
`;

export default Chart;