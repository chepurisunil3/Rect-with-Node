import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Products = ({
  productsList,
  categoriesList,
  subCategoriesList,
  addCategory,
  addSubCategory,
  addProduct,
}) => {};
Products.propTypes = {
  productsList: PropTypes.array,
  categoriesList: PropTypes.array,
  subCategoriesList: PropTypes.array,
  addCategory: PropTypes.func.isRequired,
  addSubCategory: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  productsList: state.products.productsList,
  categoriesList: state.products.categoriesList,
  subCategoriesList: state.products.subCategoriesList,
});
export default connect(mapStateToProps, {})(Products);
