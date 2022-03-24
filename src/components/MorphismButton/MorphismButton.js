import { Button } from "@material-ui/core";
import MorphismButtonStyle from "./MorphismButtonStyle.js";

function MorphismButton(element) {
  const classes = MorphismButtonStyle();
  let class_name = classes.basic16;
  if (element.class_name === "basic16") {
    class_name = classes.basic16;
  } else if (element.class_name === "basic50") {
    class_name = classes.basic50;
  } else if (element.class_name === "blue") {
    class_name = classes.blue;
  } else if (element.class_name === "purple50") {
    class_name = classes.purple50;
  } else if (element.class_name === "pink16") {
    class_name = classes.pink16;
  } else if (element.class_name === "blue_hover") {
    class_name = classes.blue_hover;
  } else if (element.class_name === "pink_hover") {
    class_name = classes.pink_hover;
  } else if (element.class_name === "basic33") {
    class_name = classes.basic33;
  } else if (element.class_name === "pink33") {
    class_name = classes.pink33;
  } else if (element.class_name === "purple33") {
    class_name = classes.purple33;
  } else if (element.class_name === "square_basic") {
    class_name = classes.square_basic;
  } else if (element.class_name === "square_good") {
    class_name = classes.square_good;
  } else if (element.class_name === "square_not") {
    class_name = classes.square_not;
  }
  return (
    <Button className={class_name} variant="contained">
      {element.name}
    </Button>
  );
}

export default MorphismButton;
