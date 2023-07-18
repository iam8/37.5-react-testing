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
    const {asFragment} = render(<Carousel photos={TEST_IMAGES} title="Test Title" />);
    expect(asFragment()).toMatchSnapshot();
});


it("Works when you click on the left arrow", () => {
    const {getByTestId, getByAltText, queryByAltText} = render(
        <Carousel
            photos={TEST_IMAGES}
            title="images for testing"
        />
    );

    // Move forward in carousel
    const rightArrow = getByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // Check that second image is shown and not the first
    expect(getByAltText("testing image 2")).toBeInTheDocument();
    expect(queryByAltText("testing image 1")).not.toBeInTheDocument();

    // Move backward in carousel
    const leftArrow = getByTestId("left-arrow");
    fireEvent.click(leftArrow);

    // Check that first image is shown and not the second
    expect(getByAltText("testing image 1")).toBeInTheDocument();
    expect(queryByAltText("testing image 2")).not.toBeInTheDocument();
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


it("Hides left arrow when current image is the first in list", () => {
    const {queryByTestId, getByAltText} = render(
        <Carousel
            photos={TEST_IMAGES}
            title="images for testing"
        />
    );

    // Check that the first image is shown
    expect(getByAltText("testing image 1")).toBeInTheDocument();

    // Check that right arrow is present but left arrow is not
    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
    expect(queryByTestId("right-arrow")).toBeInTheDocument();
});


it("Hides right arrow when current image is the last in list", () => {
    const {queryByTestId, getByAltText, getByTestId} = render(
        <Carousel
            photos={TEST_IMAGES}
            title="images for testing"
        />
    );

    const numImages = TEST_IMAGES.length;

    // Check that the first image is shown initially
    expect(getByAltText("testing image 1")).toBeInTheDocument();

    // Move to final image in list
    const rightArrow = getByTestId("right-arrow");
    for (let i = 1; i < numImages; i++) {
        fireEvent.click(rightArrow);
    }

    // Check that final image is shown
    expect(getByAltText(`testing image ${numImages}`)).toBeInTheDocument();

    // Check that left arrow is present but right arrow is not
    console.log("A log here!!!!");
    expect(rightArrow).not.toBeInTheDocument();
    expect(queryByTestId("left-arrow")).toBeInTheDocument();
});


// it("Hides both arrows when only one image in list", () => {

// });
