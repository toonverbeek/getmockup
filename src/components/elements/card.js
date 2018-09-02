import React, { Component } from "react";
import PropTypes from "prop-types";
import { Rnd } from "react-rnd";
class CardElement extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0, width: 200, height: 200 };
    this.onResize = this.onResize.bind(this);
  }

  onResize = (event, { element, size }) => {
    this.setState({ width: size.width, height: size.height });
  };

  render() {
    return (
      <Rnd
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        bounds="parent"
        resizeGrid={[50, 50]}
        dragGrid={[50, 50]}
        className={`${
          this.props.selected ? "border-2 border-black resize" : ""
        } bg-${this.props.color}-light bg-grey-lightest cursor-pointer  ${this
          .props.circle && "rounded-full"}`}
        onClick={this.props.onClick}
        style={{
          width: this.state.width + "px",
          height: this.state.height + "px"
        }}
      >
        {/* <Rnd className="react-resizable-handle bg-red w-4 h-4" /> */}
      </Rnd>
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
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default CardElement;
