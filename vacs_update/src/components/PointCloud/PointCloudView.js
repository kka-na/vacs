import React, { useState, useRef, useMemo, useEffect } from "react";
import ROSLIB from "roslib/src/RosLib";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const pointCloudTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/os_cloud_node/points",
  messageType: "sensor_msgs/PointCloud2",
  compression: "cbor",
  queue_length: 1,
});

const resize_array_right = (array, length, fill_with) =>
  array.concat(new Array(length).fill(fill_with)).slice(0, length);

function Particles({ pointCloud }) {
  const [coords, setCoords] = useState([]);
  const [sizes, setSizes] = useState([]);
  const geometry = useRef();
  useEffect(() => {
    let position = pointCloud;
    let size = new Float32Array(pointCloud.length).fill(2);
    setCoords(position);
    setSizes(size);
    if (geometry.current) {
      geometry.current.attributes.position.needsUpdate = true;
    }
  }, [pointCloud]);
  return (
    <points position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <bufferGeometry attach="geometry" ref={geometry}>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={coords.length / 3}
          array={coords}
          itemSize={3}
        />
        {/* <bufferAttribute
          attachObject={["attributes", "size"]}
          count={sizes.length}
          array={sizes}
          itemSize={1}
        /> */}
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color={"#fffff"}
        size={0.1}
        sizeAttenuation={true}
      />
    </points>
  );
}

// <DotMaterial />

export default function PointCloudView(props) {
  let max_points = 100000;
  const [isSub, setIsSub] = useState(false);
  const [positions, setPositions] = useState(new Float32Array(max_points * 3));
  let buffer = [];
  let tempPos = [];

  if (!isSub && props.sub) {
    setIsSub(true);

    pointCloudTopic.subscribe(function (message) {
      var bufSz = max_points * message.point_step;
      let n = 0;
      if (message.data.buffer) {
        buffer = message.data.slice(
          0,
          Math.min(message.data.byteLength, bufSz)
        );
        n = Math.min(message.height * message.width, positions.length / 3);
      }
      if (tempPos.length < n) {
        resize_array_right(tempPos, n, 0);
      }
      var dv = new DataView(buffer.buffer);
      var little_endian = !message.is_bigendian;
      var x = message.fields[0].offset;
      var y = message.fields[1].offset;
      var z = message.fields[2].offset;
      var base;
      for (var i = 0; i < n; i += 5) {
        base = i * message.point_step;
        tempPos[3 * i] = dv.getFloat32(base + x, little_endian);
        tempPos[3 * i + 1] = dv.getFloat32(base + y, little_endian);
        tempPos[3 * i + 2] = dv.getFloat32(base + z, little_endian);
      }
      setPositions(new Float32Array(tempPos));
    });
  }

  if (isSub && !props.sub) {
    setIsSub(false);
    pointCloudTopic.unsubscribe();
  }

  return (
    <Canvas
      camera={{ position: [0, -5, 10], fov: 100 }}
      onCreated={({ camera, scene }) => {
        camera.lookAt(0, 0, 0);
      }}
    >
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Particles pointCloud={positions} />
    </Canvas>
  );
}
