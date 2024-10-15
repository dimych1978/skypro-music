import Content from '@/components/Content/Content';
import ReduxProvider from '@/store/ReduxProvider';
import { render } from '@testing-library/react';

it('renders correctly', () => {
  const tree = render(
    <ReduxProvider>
      <Content />
    </ReduxProvider>
  );
  expect(tree).toMatchSnapshot();
});
