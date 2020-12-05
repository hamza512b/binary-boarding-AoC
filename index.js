import passes from "./input.js";

const elemt = React.createElement;

class AirPlane extends React.Component {
  temp = true;
  constructor(props) {
    super(props);
    console.log(passes);
    this.airplane = new Array(128).fill(0).map(() => new Array(8).fill(0));
    this.state = { airplane: this.airplane };
    this.passes = passes;
    this.passLen = passes.length;
  }

  run() {
    this.passes.map(pass => {
      setInterval(() => {

        this.add(pass);
      }, 500)
    });
  }

  add(pass) {
    let rows = [0, 127];
    let columns = [0, 7];
    for (let i = 0; i < this.passLen; i++) {
      if (pass[i] === 'F') rows = this.divide(rows, true);
      else if (pass[i] === 'B') rows = this.divide(rows);
      else if (pass[i] === 'R') columns = this.divide(columns);
      else if (pass[i] === 'L') columns = this.divide(columns, true);
    }

    let column, row;
    if (columns[0] === columns[1]) column = columns[0];
    else throw new Error(`Computation error`);
    if (rows[0] === rows[1]) row = rows[0];
    else throw new Error(`Computation error`);

    const id = (row * 8) + column;
    this.airplane[row][column] = id;

    this.setState({ airplane: this.airplane })
  }

  divide(int, down) {
    let diff = Math.abs(int[1] - int[0]) / 2;

    if (down) return [int[0], Math.floor(diff) + int[0]]
    else return [int[1] - Math.floor(diff), int[1]];
  }

  render() {
    return elemt(
      'div',
      { className: "airplane" },
      this.state.airplane.map(row => row.map((set, index) => {

        if ((index + 1) % 4 === 0 && this.temp) {
          this.temp = false;
          return [
            elemt("span", { className: set === 0 ? "empty" : "busy" }, set === 0 ? "." : "#"),
            elemt("span", { className: "none" }, "")
          ]
        } else if ((index + 1) % 4 === 0) this.temp = true;

        return elemt("span", { className: set === 0 ? "empty" : "busy" }, set === 0 ? "." : "#")
      }))
    );
  }

  componentDidMount() {
    this.run();
  }
}

ReactDOM.render(elemt(AirPlane, passes), document.getElementById('root'));