import { View, Image } from "react-native";
import { useEffect, useState } from "react";

export default function TankComponent({ capacity }) {
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (capacity !== undefined) {
      if (capacity >= 0 && capacity <= 20) {
        setImageName("empty-tank");
      } else if (capacity >= 21 && capacity <= 40) {
        setImageName("quarter-tank");
      } else if (capacity >= 41 && capacity <= 60) {
        setImageName("mid-tank");
      } else if (capacity >= 61 && capacity <= 80) {
        setImageName("midfull-tank");
      } else if (capacity >= 81 && capacity <= 100) {
        setImageName("full-tank");
      }
    }
  }, [capacity]);

  const images = {
    "empty-tank": require("../../../assets/empty-tank.png"),
    "quarter-tank": require("../../../assets/quarter-tank.png"),
    "mid-tank": require("../../../assets/mid-tank.png"),
    "midfull-tank": require("../../../assets/midfull-tank.png"),
    "full-tank": require("../../../assets/full-tank.png"),
  };

  return (
    <View>
      <Image
        source={images[imageName]}
        style={{ width: 200, height: 200 }}
      ></Image>
    </View>
  );
}
