import React from "react";
import Dashboard from "./Components/Dashboard.js";
import renderer from "react-test-renderer";

// Snapshot test of Dashboard componnent

test("renders correctly", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
