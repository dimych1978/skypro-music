import Filter from '@/components/Filter/Filter';
import ReduxProvider from '@/store/ReduxProvider';
import { render } from '@testing-library/react';

it('renders correctly', () => {
  const tree = render(
    <ReduxProvider>
      <Filter />
    </ReduxProvider>
  );
  expect(tree).toMatchSnapshot();
});
