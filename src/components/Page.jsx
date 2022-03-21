import Navbar from "./Navbar";

const Page = (props) => {
  return (
    <div className="container">
      <Navbar />
      {props.children}
    </div>
  );
};

export default Page;
