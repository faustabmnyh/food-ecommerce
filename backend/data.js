const bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      username: "Mamang",
      email: "mamang@gmail.com",
      password: bcrypt.hashSync("mamang123", 8),
      isAdmin: true,
    },
    {
      username: "kalace",
      email: "kalace@gmail.com",
      password: bcrypt.hashSync("kalace123", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Mediterranean Salad",
      category: "Healthy Food",
      image: "/images/products/mediterranean-salad.png",
      rating: 3.5,
      price: 9,
      num_reviews: 10,
      stock_products: 20,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus",
    },
    {
      name: "Autumn Soup",
      category: "Healthy Food",
      image: "/images/products/autumn-soup.png",
      rating: 4.7,
      price: 11,
      num_reviews: 10,
      stock_products: 13,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus",
    },
    {
      name: "Healthy Trendy Brunch",
      category: "Healthy Food",
      image: "/images/products/healthy-trendy-brunch.png",
      rating: 4.5,
      price: 7,
      num_reviews: 10,
      stock_products: 7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus",
    },
  ],
};

module.exports = data;
