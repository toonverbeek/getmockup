import React, { Component } from "react";
import PropTypes from "prop-types";
import { Rnd } from "react-rnd";
class CardElement extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0, width: 200, height: 200 };
  }

  render() {
    const {
      color,
      height,
      radius,
      border,
      shadow,
      width,
      x,
      y
    } = this.props.details;
    const shadows = ["shadow", "shadow-md", "shadow-lg"];
    const shadowIndex = shadows[shadow];

    const radiusi = [
      "rounded-none",
      "rounded-sm",
      "rounded",
      "rounded-lg",
      "rounded-full"
    ];
    const radiusIndex = radiusi[radius];
    return (
      <Rnd
        size={{ width: width, height: height }}
        position={{ x: x, y: y }}
        onDragStop={(e, d) => this.props.onDragStop(this.props.id, e, d)}
        onResize={(e, direction, ref, delta, position) =>
          this.props.onResize(this.props.id, e, direction, ref, delta, position)
        }
        bounds="parent"
        resizeGrid={[20, 20]}
        className={`${border === 1 &&
          !this.props.selected &&
          "border border-grey"} ${this.props.selected &&
          "border-2 border-dashed border-red"} bg-${color} cursor-pointer ${radiusIndex} ${shadowIndex}`}
        onClick={this.props.onClick}
        style={{
          width: this.props.width + "px",
          height: this.props.height + "px"
        }}
      />
    );
  }
}

CardElement.defaultProps = {
  height: 50,
  width: 50,
  color: "white",
  selected: false,
  circle: false
};

CardElement.propTypes = {
  circle: PropTypes.bool,
  color: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  border: PropTypes.number,
  shadow: PropTypes.number
};

export default CardElement;
