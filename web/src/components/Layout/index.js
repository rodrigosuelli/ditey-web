import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ page, onPageChange, children }) {
  return (
    <>
      <Header page={page} onPageChange={onPageChange} />
      {children}
      <Footer page={page} onPageChange={onPageChange} />
    </>
  );
}
