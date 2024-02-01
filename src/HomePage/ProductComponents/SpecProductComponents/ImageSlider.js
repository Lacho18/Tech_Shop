import { useState } from "react";

export default function ImageSlider({ images }) {
    const [currentImage, setCurrentImage] = useState(0);

    function buttonHandler(direction) {
        if (direction === "left") {
            if (currentImage > 0) {
                setCurrentImage(oldIndex => {
                    let newIndex = oldIndex - 1;
                    return newIndex;
                })
            }
            else {
                setCurrentImage(images.length - 1);
            }
        }
        else {
            if (currentImage < images.length - 1) {
                setCurrentImage(oldIndex => {
                    let newIndex = oldIndex + 1;
                    return newIndex++;
                })
            }
            else {
                setCurrentImage(0);
            }
        }
    }

    function blurButtonsHandler(event) {
        let value = event.target.value;

        setCurrentImage(value);
    }

    return (
        <div className="image-slider-div">
            <button id="left" onClick={() => buttonHandler("left")}>{"<"}</button>
            <img src={images[currentImage]} />
            <button id="right" onClick={() => buttonHandler("right")}>{">"}</button>

            <div className="dots-div">
                {images.map((element, index) => {
                    return <button key={index} value={index} style={currentImage===index ? {boxShadow: "0 0 5px 5px rgba(255, 255, 255, 0.8)"} : {}} onClick={blurButtonsHandler}></button>
                })}
            </div>
        </div>
    );
}