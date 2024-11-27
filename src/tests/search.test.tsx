import { render } from '@testing-library/react';
import Search from '@/components/Search/Search';
import ReduxProvider from '@/store/ReduxProvider';

it('renders correctly', () => {
  const tree = render(
    <ReduxProvider>
      <Search />
    </ReduxProvider>
  );
  expect(tree).toMatchSnapshot();
});
