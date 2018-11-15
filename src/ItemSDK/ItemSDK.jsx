import React from "react";
import PropTypes from "prop-types";

import "./itemSDK.scss";

const propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const ItemSDK = props => (
  <div className="item-sdk">
    <div className="item-sdk-title">{props.title}</div>
    <ul className="item-sdk-tags">
      {props.tags.map((tag, index) => <li className="item-sdk-tag" key={index}>{tag}</li>)}
    </ul>
  </div>
);

ItemSDK.propTypes = propTypes;

export default ItemSDK;
