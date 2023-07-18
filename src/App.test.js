/**
 * Tests for App (top-level) component.
 */

import { render } from "@testing-library/react";
import App from "./App";


it("Renders without crashing", () => {
    render(<App />);
});
