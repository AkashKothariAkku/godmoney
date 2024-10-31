const NonAdminLayout = ({ children }) => {
    return (
      <div className="wrapper">
        <div className="container-fluid mobile-container">
          {children}
        </div>
      </div>
    );
  };
  
  export default NonAdminLayout;
  