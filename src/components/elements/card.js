import React, { Component } from "react";
import PropTypes from "prop-types";

class CardElement extends Component {
  render() {
    const colors = [
      "grey",
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "indigo",
      "purple",
      "pink"
    ];

    const color =
      this.props.color > 9
        ? colors[10 - this.props.color]
        : colors[this.props.color];

    let x, y, height, width;
    ({ x, y, height, width } = this.props);

    return (
      <div
        className={`${
          this.props.selected ? "border-2 border-black resize" : ""
        } bg-${color}-lightest bg-grey-lightest cursor-pointer`}
        style={{
          gridArea: `${y}/${x} / ${y + height}/${x + width}` //grid-row-start / grid-col-start / grid-row-end / grid-col-end
        }}
        onClick={this.props.onClick}
      />
    );
  }
}

CardElement.defaultProps = {
  height: 2,
  width: 2,
  x: 3,
  y: 4,
  color: 0,
  selected: false
};

CardElement.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default CardElement;
