import { render } from '@testing-library/react';
import Search from '@/components/Search/Search';

it('renders correctly', () => {
  const tree = render(<Search />);
  expect(tree).toMatchSnapshot();
});
