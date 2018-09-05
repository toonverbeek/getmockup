import React, { Component } from "react";
import "./App.css";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import Select from "react-select";

import CardElement from "./components/elements/card";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFromTemplate: false,
      showSidebar: true,
      elements: [],
      deltaPosition: { x: 0, y: 0 }
    };

    this.onPropChange = this.onPropChange.bind(this);

    this.createCard = this.createCard.bind(this);
  }

  componentWillMount() {
    if (this.state.createFromTemplate) {
      const newCard0 = {
        width: 2,
        posx: 1,
        posy: 2,
        height: 13,
        color: 0,
        selected: false
      };
      const newCard = {
        width: 10,
        height: 1,
        posx: 3,
        posy: 2,
        color: 1,
        selected: false
      };
      const newCard2 = {
        width: 10,
        height: 10,
        posx: 3,
        posy: 3,
        color: 2,
        selected: false
      };

      this.setState({
        elements: [newCard0, newCard, newCard2],
        menus: [this.createMenu(0), this.createMenu(1), this.createMenu(2)]
      });
    }
  }

  onPropChange(id, propName, val) {
    let elements = [...this.state.elements];
    elements[id][propName] = val;
    this.setState({ elements });
  }

  handle(props) {
    const Handle = Slider.Handle;

    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  }

  onCardClick(id) {
    let elements = [...this.state.elements];
    elements[id].selected = !elements[id].selected;
    this.setState({ elements, showSidebar: true });
  }

  createMenu(x) {
    if (this.state.elements.length > 0) {
      const options = [
        { value: "white", label: "white" },
        { value: "grey", label: "grey" },
        { value: "red", label: "red" },
        { value: "orange", label: "orange" },
        { value: "green", label: "green" },
        { value: "teal", label: "teal" },
        { value: "blue", label: "blue" },
        { value: "indigo", label: "indigo" },
        { value: "purple", label: "purple" },
        { value: "pink", label: "pink" }
      ];

      return (
        <div
          key={`menu-${x}`}
          className={`${
            this.state.elements[x].selected ? "visible" : "hidden"
          } border-b-4 p-4 border-grey`}
        >
          <h2>Card {x + 1}</h2>
          <br />
          <b>Width</b>
          <Slider
            min={1}
            max={12}
            defaultValue={4}
            onChange={e => this.onPropChange(x, "width", e)}
            handle={this.handle}
          />
          <br />
          <b>Height</b>
          <Slider
            min={1}
            max={13}
            defaultValue={5}
            onChange={e => this.onPropChange(x, "height", e)}
            handle={this.handle}
          />
          <br />
          <b>Pos x</b>
          <Slider
            min={1}
            max={13}
            defaultValue={2}
            onChange={e => this.onPropChange(x, "posx", e)}
            handle={this.handle}
          />
          <br />
          <b>Pos y</b>
          <Slider
            min={2}
            max={13}
            defaultValue={2}
            onChange={e => this.onPropChange(x, "posy", e)}
            handle={this.handle}
          />
          <br />
          <button
            onClick={() => {
              console.log("remove");
            }}
            className="bg-red hover:bg-red-light text-white  py-2 px-4 border-b-4 border-red-dark hover:border-red rounded"
          >
            Remove card
          </button>
          <br />
          <Select
            value={this.state.selectedOption}
            onChange={selectedOption =>
              this.onPropChange(x, "color", selectedOption.value)
            }
            options={options}
          />
        </div>
      );
    }
  }

  renderCard(cardType, x) {
    return (
      <CardElement
        key={`card-${x}`}
        circle={cardType === "circle"}
        width={this.state.elements[x].width}
        height={this.state.elements[x].height}
        onClick={e => this.onCardClick(x, e)}
        selected={this.state.elements[x].selected}
        color={this.state.elements[x].color}
      />
    );
  }

  createCard(cardType, x) {
    const card = {
      type: cardType,
      width: 5,
      height: 5,
      posx: 120,
      posy: 120,
      color: "white",
      selected: true
    };

    this.setState(prevState => {
      return { elements: [...prevState.elements, card] };
    });
  }

  render() {
    let elements = [];
    let menus = [];

    for (let x = 0; x < this.state.elements.length; x++) {
      menus.push(this.createMenu(x));
      elements.push(this.renderCard(this.state.elements[x].type, x));
    }
    return (
      <div className="App">
        {this.state.showSidebar && (
          <div className="sidebar  p-5 bg-white">
            <span
              className="cursor-pointer block text-3xl text-right text-right"
              onClick={() =>
                this.setState(prevState => {
                  return { showSidebar: !prevState.showSidebar };
                })
              }
            >
              👈
            </span>
            <button
              onClick={() => {
                this.createCard("card", this.state.elements.length);
              }}
              className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
            >
              Create card
            </button>
            <button
              onClick={() => {
                this.createCard("circle", this.state.elements.length);
              }}
              className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
            >
              Create circle
            </button>
            <br />
            {menus}
          </div>
        )}

        <div
          style={{ gridColumn: this.state.showSidebar ? "2/-1" : "1/-1" }}
          className="canvas p-b-2 flex bg-grey-darkest"
        >
          <div className="menu-bar bg-grey-lighter flex px-4 py-3">
            <div className="mr-6">
              <span className="inline-block rounded-full bg-grey h-3 w-3 mr-1" />{" "}
              <span className="inline-block rounded-full bg-grey h-3 w-3 mr-1" />{" "}
              <span className="inline-block rounded-full bg-grey h-3 w-3" />
            </div>
            <div className="flex-1 bg-white border border-grey-light rounded mr-4" />
          </div>
          <div>{elements}</div>
        </div>
      </div>
    );
  }
}

export default App;
