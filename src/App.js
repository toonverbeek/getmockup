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
      elements: {},
      menus: []
    };

    this.onPropChange = this.onPropChange.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onResize = this.onResize.bind(this);
    this.createCard = this.createCard.bind(this);
    this.loadLayout = this.loadLayout.bind(this);
  }

  loadLayout() {
    const ref = JSON.parse(localStorage.getItem("elements"));
    if (ref && Object.keys(ref).length > 0) {
      const menus = Object.keys(ref).map(key => {
        if (ref[key] !== null) {
          ref[key].id = key;
        }
        return this.createMenu(key);
      });

      this.setState({
        elements: ref
      });

      this.setState({ menus });
    }
  }

  onPropChange(id, updatedProps) {
    // take copy of current state
    const elements = { ...this.state.elements };
    // update that state
    elements[id] = { ...elements[id], ...updatedProps };

    // set that to state
    this.setState({ elements });
  }

  removeElement(key) {
    // 1. take copy of state
    const elements = { ...this.state.elements };
    //2. update the state
    elements[key] = null;

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
    const elements = { ...this.state.elements };
    // update that state
    let updatedElement = elements[id];
    if (updatedElement.hasGroup && updatedElement.hasGroup > 1) {
      updatedElement.hasGroup.forEach(el => {
        const element = { ...this.state.elements[el] };
        // element.selected = !updatedElement.selected;
        this.onPropChange(element.id, { selected: updatedElement.selected });
      });
    } else {
      updatedElement.selected = !updatedElement.selected;
    }
    // set that to state
    this.setState({ elements });
  }

  createMenu(x) {
    if (this.state.elements[x]) {
      const options = [
        { value: "white", label: "white" },
        { value: "black", label: "black" },
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

      const element = this.state.elements[x];

      return (
        <div
          key={`menu-${x}`}
          className={`${
            element.selected ? "visible" : "hidden"
          } border-b-4 p-4 border-grey`}
        >
          <h2>Card {x}</h2>
          <br />
          <b>border</b>
          <Slider
            min={0}
            max={1}
            defaultValue={element.border}
            onChange={e => this.onPropChange(x, { border: e })}
            handle={this.handle}
          />
          <br />
          <b>Shadow</b>
          <Slider
            min={0}
            max={2}
            defaultValue={element.shadow}
            onChange={e => this.onPropChange(x, { shadow: e })}
            handle={this.handle}
          />
          <br />
          <b>Rounded corners</b>
          <Slider
            min={0}
            max={4}
            defaultValue={element.radius}
            onChange={e => this.onPropChange(x, { radius: e })}
            handle={this.handle}
          />
          <br />
          <button
            onClick={() => this.removeElement(x)}
            className="bg-red hover:bg-red-light text-white  py-2 px-4 border-b-4 border-red-dark hover:border-red rounded"
          >
            Remove card
          </button>
          <br />
          <button
            onClick={() => {
              if (element.hasGroup && element.hasGroup.length > 1) {
                const newElement = { ...element };
                newElement.hasGroup = [];

                element.hasGroup.forEach(async el => {
                  const index = Object.keys(this.state.elements).length;

                  const _element = this.state.elements[el];
                  newElement.hasGroup.push(index);
                  console.log(`pushing ${index} to hasGroup`);

                  await this.createCard(index, {
                    ..._element,
                    x: _element.x + 20,
                    y: _element.y + 20,
                    id: index
                  });
                });
                this.createCard(Object.keys(this.state.elements).length, {
                  ...newElement,
                  x: newElement.x + 20,
                  y: newElement.y + 20,
                  id: Object.keys(this.state.elements).length
                });
              } else {
                this.createCard(Object.keys(this.state.elements).length, {
                  ...element,
                  x: element.x + 20,
                  y: element.y + 20,
                  id: Object.keys(this.state.elements).length
                });
              }
            }}
            className="bg-blue hover:bg-blue-light text-white  py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
          >
            Duplicate card
          </button>

          <br />
          <button
            onClick={() => {
              if (!element.hasGroup && !element.groupedBy) {
                const selectedElements = Object.keys(
                  this.state.elements
                ).reduce((prevArray, key) => {
                  const el = { ...this.state.elements[key] };
                  if (el.selected) {
                    el.groupedBy = element.id;
                    return [...prevArray, el.id];
                  } else {
                    return prevArray;
                  }
                }, []);
                this.onPropChange(element.id, { hasGroup: selectedElements });
              } else {
                this.onPropChange(element.id, {
                  groupedBy: null,
                  hasGroup: null
                });
              }
            }}
            className="bg-blue hover:bg-blue-light text-white  py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
          >
            {element.hasGroup || element.groupedBy
              ? "Ungroup cards"
              : "Group cards"}
          </button>
          <br />
          <Select
            value={x.color}
            onChange={selectedOption =>
              this.onPropChange(x, { color: selectedOption.value })
            }
            className="text-black"
            options={options}
          />
        </div>
      );
    }
  }

  onDragStop = (id, e, d) => {
    const oldElement = { ...this.state.elements[id] };
    this.onPropChange(id, { x: d.x, y: d.y });
    if (oldElement.hasGroup && oldElement.hasGroup.length > 0) {
      oldElement.hasGroup.forEach(el => {
        const groupedElement = { ...this.state.elements[el] };
        const delta = {
          x: Math.abs(oldElement.x - groupedElement.x),
          y: Math.abs(oldElement.y - groupedElement.y)
        };
        if (id !== el) {
          this.onPropChange(el, {
            x: d.x + delta.x,
            y: d.y + delta.y
          });
        }
      });
    }
  };

  onResize = (id, e, direction, ref, delta, position) => {
    this.onPropChange(id, {
      width: ref.style.width,
      height: ref.style.height,
      ...position
    });
  };

  renderCard(x) {
    return (
      <CardElement
        key={x}
        id={x}
        onClick={e => this.onCardClick(x, e)}
        selected={this.state.elements[x].selected}
        color={this.state.elements[x].color}
        border={this.state.elements[x].border}
        shadow={this.state.elements[x].shadow}
        radius={this.state.elements[x].radius}
      />
    );
  }

  createCard(x, card = null) {
    const element =
      card !== null
        ? card
        : {
            id: `${x}`,
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            color: "white",
            selected: true
          };

    const elements = { ...this.state.elements };
    elements[Object.keys(elements).length] = element;

    this.setState(prevState => {
      return { elements, menus: [...prevState.menus, this.createMenu(x)] };
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.showSidebar && (
          <div className="sidebar overflow-scroll p-5 text-white bg-grey-darkest">
            {/* <span
              className="cursor-pointer block text-3xl text-right text-right"
              onClick={() =>
                this.setState(prevState => {
                  return { showSidebar: !prevState.showSidebar };
                })
              }
            >
              👈
            </span> */}
            <div>
              <button
                onClick={() => {
                  this.createCard(Object.keys(this.state.elements).length);
                }}
                className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
              >
                Create card
              </button>
              <button
                onClick={() => {
                  localStorage.setItem(
                    "elements",
                    JSON.stringify(this.state.elements)
                  );
                }}
                className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
              >
                Save layout
              </button>
              <button
                onClick={this.loadLayout}
                className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
              >
                Load layout
              </button>
              <button
                onClick={() => {
                  const elements = Object.keys(this.state.elements).map(key => {
                    const el = { ...this.state.elements[key] };
                    if (el !== null) {
                      el.selected = false;
                    }
                    return el;
                  });
                  this.setState({ elements });
                }}
                className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
              >
                Deselect all
              </button>
            </div>
            <br />
            {this.state.menus.map((menu, i) => this.createMenu(i))}
          </div>
        )}

        <div
          style={{ gridColumn: this.state.showSidebar ? "2/-1" : "1/-1" }}
          className="canvas p-b-2 flex bg-white"
        >
          <div className="menu-bar bg-grey-lighter flex px-4 py-3">
            <div className="mr-6">
              <span className="inline-block rounded-full bg-grey h-3 w-3 mr-1" />{" "}
              <span className="inline-block rounded-full bg-grey h-3 w-3 mr-1" />{" "}
              <span className="inline-block rounded-full bg-grey h-3 w-3" />
            </div>
            <div className="flex-1 bg-white border border-grey-light rounded mr-4" />
          </div>
          <div>
            {Object.keys(this.state.elements).map(
              key =>
                this.state.elements[key] && (
                  <CardElement
                    key={key}
                    id={key}
                    onClick={e => this.onCardClick(key, e)}
                    selected={this.state.elements[key].selected}
                    details={this.state.elements[key]}
                    onDragStop={this.onDragStop}
                    onResize={this.onResize}
                  />
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
