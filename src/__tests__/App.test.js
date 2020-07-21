import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { timeStamp } from "console";

describe("<App /> component", () => {
  test("render list of events", () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});
