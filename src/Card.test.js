/**
 * Tests for Card component.
 */

import { render, fireEvent } from "@testing-library/react";
import Card from "./Card.js";
import TEST_IMAGES from "./_testCommon.js";

const testImg1 = TEST_IMAGES[0];
const testImg2 = TEST_IMAGES[1];
const testImg3 = TEST_IMAGES[2];
const totalNum = TEST_IMAGES.length;


it("Renders without crashing", () => {
    render(<Card caption={testImg1.caption} src={testImg1.src} currNum={0} totalNum={totalNum} />);
});


it("Matches snapshot", () => {
    const {asFragment} = render(<Card
        caption={testImg1.caption}
        src={testImg1.src}
        currNum={0}
        totalNum={totalNum} />);

    expect(asFragment()).toMatchSnapshot();
});
