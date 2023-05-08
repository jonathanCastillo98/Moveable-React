import "./moveableComp.css";
import Moveable from "react-moveable";
// Normally, I would use an useEffect to fetch data but for this, I just put the link to the photo as a global link.
import { MOVE_ME_IMAGE } from "../../utils/constants";

const MoveableComp = ({
  handleOnDrag,
  handleOnResize,
  handleOnRotate,
  isDraggable,
  isResizable,
  isRotable,
}) => {
  return (
    <>
      <img className="target" src={MOVE_ME_IMAGE} alt={MOVE_ME_IMAGE} />

      {/* Conditional Rendering ton ensure there is always and Image */}
      {MOVE_ME_IMAGE && (
        <Moveable
          target={".target"}
          container={null}
          origin={false}
          /* Resize event edges */
          edge={false}
          /* Handlers and state variables were passed as props */

          /* draggable */
          draggable={isDraggable}
          throttleDrag={0}
          onDrag={handleOnDrag}
          /* resizable */
          resizable={isResizable}
          throttleResize={0}
          onResize={handleOnResize}
          /* rotable */
          rotatable={isRotable}
          throttleRotate={0}
          onRotate={handleOnRotate}
        />
      )}
    </>
  );
};
export default MoveableComp;
