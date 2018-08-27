import React, { Component } from "react";
import PropTypes from "prop-types";

class CardElement extends Component {
  //   componentWillReceiveProps(nextProps) {
  //     console.log("hoi");
  //     return this.props !== nextProps;
  //   }

  constructor(props) {
    super(props);

    this.state = {
      height: props.height,
      width: props.width,
      x: props.x,
      y: props.y,
      color: props.color,
      selected: props.selected
    };
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("hoi");
  }
  render() {
    // const position = ["absolute pin-l", "m-auto", "absolute pin-r"];
    // const widths = [
    //   "w-1/6",
    //   "w-1/5",
    //   "w-1/4",
    //   "w-1/3",
    //   "w-2/5",
    //   "w-1/2",
    //   "w-3/5",
    //   "w-2/3",
    //   "w-3/4",
    //   "w-4/5",
    //   "w-full"
    // ];
    // const heights = [
    //   "h-1",
    //   "h-2",
    //   "h-3",
    //   "h-4",
    //   "h-6",
    //   "h-8",
    //   "h-10",
    //   "h-12",
    //   "h-16",
    //   "h-24",
    //   "h-32",
    //   "h-48",
    //   "h-64",
    //   "h-full",
    //   "h-screen"
    // ];

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
    return (
      //   <div
      //     className={`bg-white shadow ${position[this.props.pos - 1]} ${
      //       widths[this.props.width - 1]
      //     } ${heights[this.props.height]}`}
      //   >
      <div
        className={`${
          this.props.selected ? "border-2 border-black resize" : ""
        } bg-${color}-lightest bg-grey-lightest cursor-pointer`}
        style={{
          gridArea: `${this.props.y}/${this.props.x} / ${this.props.y +
            this.props.height}/${this.props.x + this.props.width}` //grid-row-start / grid-col-start / grid-row-end / grid-col-end
        }}
        onClick={this.props.onClick}
      >
        {/* <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-grey-dark flex items-center">
              <svg
                className="fill-current text-grey w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              • S • M • L •
            </p>
            <div className="text-black font-bold text-xl mb-2">
              Can coffee make you a better developer?
            </div>
            <p className="text-grey-darker text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-black leading-none">Jonathan Reinink</p>
              <p className="text-grey-dark">Aug 18</p>
            </div>
          </div>
        </div> */}
      </div>
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
