import { render } from '@testing-library/react';
import { Nav } from '@/components/Nav/Nav';

it('renders correctly', () => {
  const tree = render(<Nav />);
  expect(tree).toMatchSnapshot();
});
