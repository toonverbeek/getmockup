import React, { Component } from "react";
import "./App.css";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

import "rc-slider/assets/index.css";

import CardElement from "./components/elements/card";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "width-0": 2,
      "posx-0": 1,
      "posy-0": 2,
      "height-0": 13,
      "visible-0": false,
      cardCount: 3,
      createFromTemplate: true,
      showSidebar: true,
      cards: [],
      menus: []
    };

    this.onChange = this.onChange.bind(this);
    this.onPosXChange = this.onPosXChange.bind(this);
    this.onPosYChange = this.onPosYChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
  }

  componentWillMount() {
    let cards = [];
    let menus = [];
    if (this.state.createFromTemplate) {
      this.setState({
        ["width-" + 1]: 10,
        ["height-" + 1]: 2,
        ["width-" + 2]: 10,
        ["height-" + 2]: 9,
        ["posx-" + 1]: 3,
        ["posy-" + 1]: 2,
        ["posx-" + 2]: 3,
        ["posy-" + 1]: 2,
        ["color-" + 1]: 1,
        ["color-" + 2]: 2,
        cardCount: 3
      });
      menus.push(this.createMenu(0), this.createMenu(1), this.createMenu(2));
    }
    this.setState({ menus, cards });
  }

  onChange(x, width) {
    this.setState({ ["width-" + x]: width });
  }

  onPosXChange(x, pos) {
    this.setState({ ["posx-" + x]: pos });
  }

  onPosYChange(x, pos) {
    this.setState({ ["posy-" + x]: pos });
  }

  onHeightChange(x, height) {
    this.setState({ ["height-" + x]: height });
  }

  onCardChange(cardCount) {
    this.setState({ cardCount });
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
    this.setState(prevState => {
      return {
        ["visible-" + id]: !prevState["visible-" + id],
        showSidebar: true
      };
    });
  }

  createMenu(x) {
    return (
      <div
        key={`menu-${x}`}
        className={`${
          this.state[`visible-` + x] ? "visible" : "hidden"
        } border-b-4 p-4 border-grey`}
      >
        <h2>Card {x + 1}</h2>
        <br />
        <b>Width</b>
        <Slider
          min={1}
          max={12}
          defaultValue={4}
          onChange={e => this.onChange(x, e)}
          handle={this.handle}
        />
        <br />
        <b>Height</b>
        <Slider
          min={1}
          max={13}
          defaultValue={5}
          onChange={e => this.onHeightChange(x, e)}
          handle={this.handle}
        />
        <br />
        <b>Pos x</b>
        <Slider
          min={1}
          max={13}
          defaultValue={2}
          onChange={e => this.onPosXChange(x, e)}
          handle={this.handle}
        />
        <br />
        <b>Pos y</b>
        <Slider
          min={2}
          max={13}
          defaultValue={2}
          onChange={e => this.onPosYChange(x, e)}
          handle={this.handle}
        />
      </div>
    );
  }

  createCard(x) {
    return (
      <CardElement
        key={`card-${x}`}
        width={this.state[`width-${x}`]}
        height={this.state[`height-${x}`]}
        x={this.state[`posx-${x}`]}
        y={this.state[`posy-${x}`]}
        onClick={e => this.onCardClick(x, e)}
        selected={this.state[`visible-${x}`]}
        color={x}
      />
    );
  }

  render() {
    let cards = [];
    let menus = [];

    for (let x = 0; x < this.state.cardCount; x++) {
      menus.push(this.createMenu(x));
      cards.push(this.createCard(x));
    }

    // for (let x = 0 + this.state.cards.length; x < this.state.cardCount; x++) {
    //   menus.push(this.createMenu(x));
    //   cards.push(this.createCard(x));
    // }

    return (
      <div className="App">
        {this.state.showSidebar && (
          <div className="sidebar p-5 bg-white">
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
                this.setState(prevState => {
                  return {
                    cards: [
                      ...prevState.cards,
                      this.createCard(prevState.cards.length)
                    ],
                    menus: [
                      ...prevState.menus,
                      this.createMenu(prevState.menus.length)
                    ]
                  };
                });
              }}
              className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
            >
              Create card
            </button>
            <br />
            <br />
            <br />
            {/* <b>Total cards</b>
            <Slider
              min={0}
              max={20}
              defaultValue={this.state.cardCount}
              onChange={this.onCardChange}
              handle={this.handle}
            /> */}
            {menus}
          </div>
        )}
        <div
          style={{ gridColumn: this.state.showSidebar ? "2/-1" : "1/-1" }}
          className="canvas bg-grey-darkest"
        >
          <div className="menu-bar bg-grey-lighter flex px-4 py-3">
            <div className="mr-6">
              <span className="inline-block rounded-full bg-grey h-3 w-3 mr-1" />{" "}
              <span className="inline-block rounded-full bg-grey h-3 w-3 mr-1" />{" "}
              <span className="inline-block rounded-full bg-grey h-3 w-3" />
            </div>
            <div className="flex-1 bg-white border border-grey-light rounded mr-4" />
          </div>
          {cards}
        </div>
      </div>
    );
  }
}

export default App;
