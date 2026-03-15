import LatestProducts from "./common/LatestProducts";
import FeatureProducts from "./common/FeatureProducts";
import Layout from "./common/Layout";
import Hero from "./common/Hero";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeatureProducts />
      </Layout>
    </>
  );
};

export default Home;
