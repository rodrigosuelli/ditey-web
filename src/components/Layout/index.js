import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ page, setPage, children }) {
  return (
    <>
      <Header page={page} onPageChange={setPage} />
      {children}
      <Footer page={page} onPageChange={setPage} />
    </>
  );
}
