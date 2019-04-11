import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
  DateTimePicker,
  InlineDatePicker
} from "./lib";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import logo from "./logo.svg";
import "./App.css";
import moment from "moment";

function App() {
  const [selectedDate, handleDateChange] = useState(moment().format('ddd MMM D YYYY'));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="pickers">
            <InlineDatePicker
              openTo="month"
              views={["year", "month", "day"]}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
}

export default App;
