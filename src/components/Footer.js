import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid ">
        <div className="d-flex align-items-center justify-content-center small ">
          <div className="text-muted "> &copy; {`${new Date().getFullYear()} Open Source`}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
