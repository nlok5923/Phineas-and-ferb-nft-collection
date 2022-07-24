import "./Container.scss";

const Container = () => {
  return (
    <div
      className="dashboard-container-1"
      style={{
        backgroundImage: `url("/assets/images/home/bg1.png")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="inner-top-div"
        style={{
          backgroundImage: `url("/assets/images/home/bg2.png")`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <span className="top-button-1">
            <span>Hard!! Phineas and ferb fans ?</span>
          </span>
          <div className="top-container-left-text">
            <h2>
              Buy some exclusive NFTs <br />
              and support phineas and ferb
            </h2>
            <p>
              Amount collected via this collection
              <br />
              will directly goes to the making of
              <br />
              Phineas and Ferb series
            </p>
          </div>
        </div>
        <div>
          <img src="/assets/images/home/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Container;