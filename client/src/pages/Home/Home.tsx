import Category from "../../components/Category/Category";
import './Home.css'

const Home = () => {
  return (
    <div className="homepage">
      <div className="banner">
        <h1>Banner Area</h1>
      </div>
      <div className="banner-indicator">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="section">
        <div className="my-bulb">
          <img src="/light-bulb.png" className="bulb-icon" />
          <h3>Balance</h3>
          <h2>10,000</h2>
        </div>
        <div className="my-purchase">
          <img src="/shopping-bag.png" className="bag-icon" />
          <h2 className="text1">My</h2>
          <h2 className="text2">Purchase</h2>
        </div>
      </div>
      <div className="category-header">
        <h2>Browse Category</h2>
      </div>
      <div className="category-section">
        <div className="category">
          <Category category="All Products" items={150}/>
          <Category category="Fashion" items={30}/>
          <Category category="Beauty" items={50}/>
          <Category category="Food & Drinks" items={70}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
