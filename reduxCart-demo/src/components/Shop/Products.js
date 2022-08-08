import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: "m1",
    title: "JavaScript",
    price: 11,
    description: "Introduction to JavaScript world"
  },
  {
    id: "m2",
    title: "Nodejs",
    price: 17,
    description: "How to build an API using Nodejs"
  },
  {
    id: "m3",
    title: "Redux",
    price: 13,
    description: "Redux and Redux toolkit for easier development"
  },
  {
    id: "m4",
    title: "Reactjs",
    price: 9,
    description: "Main concept behind React"
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (<ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />))}
      </ul>
    </section>
  );
};

export default Products;
