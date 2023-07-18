/**
 * Tests for Carousel component.
 */

import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

const testImg1 = TEST_IMAGES[0];
const testImg2 = TEST_IMAGES[1];
const testImg3 = TEST_IMAGES[2];
const totalNum = TEST_IMAGES.length;


it("Renders without crashing", () => {
    render(<Carousel photos={TEST_IMAGES} title="Carousel Title" />);
});


it("Matches snapshot", () => {
    const {asFragment} = render(<Carousel photos={TEST_IMAGES} title="Carousel Title" />);
    expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
    const { container } = render(
        <Carousel
            photos={TEST_IMAGES}
            title="images for testing"
        />
    );
    // expect the first image to show, but not the second
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
});
