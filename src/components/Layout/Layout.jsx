import React from 'react';
import BottomNav from '../BottomNav/BottomNav';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.layout__content}>{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
