import "./App.css";
import { useState } from "react";
import { MoveableComp } from "./components/MoveableComp";

const App = () => {
  // State variables

  // Those ones are to enable / disable the options to drag, resize and rotate.
  const [isDraggable, setIsDraggable] = useState(true);
  const [isResizable, setIsResizable] = useState(false);
  const [isRotable, setIsRotable] = useState(false);

  const [position, setPosition] = useState({
    positionX: null,
    positionY: null,
  });

  const [size, setSize] = useState({
    width: null,
    height: null,
  });

  const [rotate, setRotate] = useState();

  // Handlers

  /* This is a function from API documentation that takes a DOM element and assign it as a target
     The function also receives the click event, thats why the function has access to the position of the mouse
     when the click event occours, then it takes the values of the mouse and reasigns the position
     The transform argument has access to the translate (position X and Y) and also the rotation,
     in this case we're just updating the position. */
  const handleOnDrag = ({ target, transform, clientX, clientY }) => {
    target.style.transform = transform;
    setPosition({ positionX: clientX, positionY: clientY });
  };

  /* This function is similar to the previous one, but here it has the current width and height,
      it also has through the target the style property that has many properties we can set like the transform 
      property that we saw previoulsy and also the width and height. There are two conditionals there, 
      delta is an array that specifies the change of width or height respectively, so if there is any change in 
      delta (width or height), it automatically updates whatever value was modified.
  */
  const handleOnResize = ({ target, width, height, delta, dist }) => {
    delta[0] && (target.style.width = `${width}px`);
    delta[1] && (target.style.height = `${height}px`);
    setSize({ width: width, height: height });
  };

  /* Here I get the transform property that contains the rotation as a string, so in order to show it 
      I decided to convert it to a number, but first I needed to get just the numer so I used a substring.
      As in the first function to drag, here I am using the transform property but this time just to update
      the rotation I need to manipulate a little it the strings to get exactly the numbers, this is interesting
      because transform gives me two values if I move the position the string changes, so that's why I needed to make
      some logic to fix that.
  */
  const handleOnRotate = ({ target, transform }) => {
    target.style.transform = transform;
    let rotationDeg;
    if (transform[0] !== "t") {
      const rotationString = transform.substring(8, 24).padEnd(17, "0");
      rotationDeg = Number.parseFloat(rotationString);
    } else {
      const rotationString = transform.substring(39, 55).padEnd(17, "0");
      if (typeof rotationString[0] != "number") {
        const onlyNumbers = rotationString.replace(/[^0-9]+/g, "");
        const splitted = onlyNumbers.split("");
        splitted.splice(2, 0, ".");
        const joined = splitted.join("");
        rotationDeg = Number.parseFloat(joined);
      } else {
        rotationDeg = Number.parseFloat(rotationString);
      }
    }
    setRotate(rotationDeg);
  };

  return (
    <>
      <div className="root">
        <MoveableComp
          className="mov"
          isDraggable={isDraggable}
          isResizable={isResizable}
          isRotable={isRotable}
          handleOnDrag={handleOnDrag}
          handleOnResize={handleOnResize}
          handleOnRotate={handleOnRotate}
        />
        <div className="Info">
          <h1>DATA</h1>
          <h3>Move, resize or rotate to show the data!</h3>
          {/* Here I applied conditional rendering to show the data */}
          {position.positionX && (
            <div>
              {`Position: ${position.positionX.toFixed(
                0
              )}x, ${position.positionY.toFixed(0)}y
              `}
            </div>
          )}
          {size.width && (
            <div>
              {`Size: ${size.width.toFixed(0)}px, ${size.height.toFixed(0)}px`}
            </div>
          )}
          {rotate && <div>{`Rotation: ${rotate.toFixed(2)}°`}</div>}
        </div>

        <div className="btns">
          <p>Is Draggable</p>
          <div
            onClick={() => {
              setIsDraggable(!isDraggable);
            }}
            className={isDraggable ? "active" : "toggle-btn"}
          >
            <div className="inner-circle"></div>
          </div>

          <p>Is Resizable</p>
          <div
            onClick={() => {
              setIsResizable(!isResizable);
            }}
            className={isResizable ? "active" : "toggle-btn"}
          >
            <div className="inner-circle"></div>
          </div>

          <p>Is Rotabble</p>
          <div
            onClick={() => {
              setIsRotable(!isRotable);
            }}
            className={isRotable ? "active" : "toggle-btn"}
          >
            <div className="inner-circle"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
