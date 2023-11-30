import React, { Component, MouseEvent } from "react";

interface TestProps {}
interface TestState {
  x: number;
  y: number;
}

class Test extends Component<TestProps, TestState> {
  private handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    this.logMousePosition(e);
  };

  constructor(props: TestProps) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }
  logMousePosition = (e: MouseEvent<HTMLDivElement>) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  componentDidMount(): void {
    window.addEventListener("mousemove", this.handleMouseMove as any);
  }
  componentWillUnmount(): void {
    window.removeEventListener("mousemove", this.handleMouseMove as any);
  }
  render() {
    return (
      <div>
        <p>X: {this.state.x}</p>
        <p>Y: {this.state.y}</p>
      </div>
    );
  }
}

export default Test;
