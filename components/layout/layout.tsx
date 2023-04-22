import { FC, Fragment } from 'react';
import MainHeader from './main-header';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
