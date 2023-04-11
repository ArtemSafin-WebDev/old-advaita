import home from "./pages-data/home";
import contacts from "./pages-data/contacts";
import notFound from "./pages-data/not-found";
import service from "./pages-data/service";
import products from "./pages-data/products";

const pagesConfig = {
  ...home,
  ...contacts,
  ...notFound,
  ...service,
  ...products,
};

export default pagesConfig;
