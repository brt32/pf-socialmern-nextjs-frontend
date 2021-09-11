const ParallaxBg = ({ url, children = "Welcome to Social MERN!" }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url( " + url + " )",
        backgroundAttachment: "fixed",
        padding: "120px 0px 45px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <h1 className="display-1 font-weight-bold text-center text-light font-monospace">
        {children}
      </h1>
    </div>
  );
};

export default ParallaxBg;
