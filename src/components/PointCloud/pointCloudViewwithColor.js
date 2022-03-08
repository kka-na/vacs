import React, { useState, useRef, useEffect } from "react";
import ROSLIB from "roslib/src/RosLib";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./dotmaterial";
import * as THREE from "three";

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

function Particles({ pointCloud, pointCloudColor }) {
  const [coords, setCoords] = useState([]);
  const [pointsColors, setPointsColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const geometry = useRef();
  const frame = useRef();
  useEffect(() => {
    let position = pointCloud;
    let size = new Float32Array(pointCloud.length).fill(2);
    let color = pointCloudColor;
    setCoords(position);
    setPointsColors(color);
    setSizes(size);
    if (geometry.current) {
      geometry.current.attributes.position.needsUpdate = true;
      geometry.current.attributes.color.needsUpdate = true;
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
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={pointsColors.length / 3}
          array={pointsColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        vertexColors
        size={0.3}
        sizeAttenuation={true}
      />
      {/*<dotMaterial />*/}
    </points>
  );
}

export default function PointCloudView(props) {
  const [isSub, setIsSub] = useState(false);
  const [positions, setPositions] = useState(new Float32Array(100000 * 3));
  const [colors, setColors] = useState(new Float32Array(100000 * 3));
  let buffer = [];
  let tempPos = [];
  let tempColor = [];

  const parseField = (point, dv, offset, field_num, little_endian) => {
    if (field_num < 3) {
      tempPos[point] = dv.getFloat32(offset, little_endian);
    } else {
      var tempI = dv.getFloat32(offset, little_endian);
      tempColor[point] = 1 - tempI;
      tempColor[point + 1] = tempI;
      tempColor[point + 2] = 1 - tempI * tempI;
    }
  };

  if (!isSub && props.sub) {
    setIsSub(true);

    pointCloudTopic.subscribe(function (message) {
      var bufSz = 100000 * message.point_step;
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
        resize_array_right(tempColor, n, 0);
      }

      var dv = new DataView(buffer.buffer);
      var little_endian = !message.is_bigendian;
      var byte_offset;
      // var x = message.fields[0].offset;
      // var y = message.fields[1].offset;
      // var z = message.fields[2].offset;
      // var base;
      for (var i = 0; i < n; i++) {
        for (var f in message.fields) {
          byte_offset =
            i * message.point_step + Number(message.fields[f].offset);
          parseField(
            Number(3 * i) + Number(f),
            dv,
            byte_offset,
            f,
            little_endian
          );
        }
        // base = i * message.point_step;
        // tempPos[3 * i] = dv.getFloat32(base + x, little_endian);
        // tempPos[3 * i + 1] = dv.getFloat32(base + y, little_endian);
        // tempPos[3 * i + 2] = dv.getFloat32(base + z, little_endian);
      }
      setPositions(new Float32Array(tempPos));
      setColors(new Float32Array(tempColor));
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
      <Particles pointCloud={positions} pointCloudColor={colors} />
    </Canvas>
  );
}

/*
 <Canvas>
    <OrbitControls/>
    <ambientLight intensity={0.5}/>
    <spotLight position={[10, 15, 10]} angle={0.3}/>
    <mesh position={[0,0,0]}>
        <boxBufferGeometry attatch="geometry" />
        <meshLambertMaterial attatch="material" color="orange" />
    </mesh>
    <Particles data={pointCloud}/>
</Canvas> 

 <points position={[0, -25, 0]} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
          <bufferGeometry>
            <bufferAttribute attachObject={["attributes", "position"]} count={coords.length / 2} array={coords} itemSize={2} />
            <bufferAttribute attachObject={["attributes", "size"]} count={sizes.length} array={sizes} itemSize={1} />
          </bufferGeometry>
          <dotMaterial />
        </points>

<group ref={frame} rotation={0.3} position={[0,10,0]}>
    <points>
        <bufferGeometry attach="geometry" ref={geometry}>
            <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial attach="material" vertexColors size={pointSize} sizeAttenuation={true} />
    </points>
</group>

 */
/*
    else{
        console.log("else")
        if(!buffer || buffer.byteLength < bufSz){
            buffer = new Uint8Array(bufSz);
        }
        n = decode64(message.data, buffer, message.point_step, 1);
    }*/

/*


function decode64(inbytes, outbytes, record_size, pointRatio) {
    var x,b=0,l=0,j=0,L=inbytes.length,A=outbytes.length;
    record_size = record_size || A; // default copies everything (no skipping)
    pointRatio = pointRatio || 1; // default copies everything (no skipping)
    var bitskip = (pointRatio-1) * record_size * 8;
    for(x=0;x<L&&j<A;x++){
        b=(b<<6)+decode64.e[inbytes.charAt(x)];
        l+=6;
        if(l>=8){
            l-=8;
            outbytes[j++]=(b>>>l)&0xff;
            if((j % record_size) === 0) { // skip records
                // no    optimization: for(var i=0;i<bitskip;x++){l+=6;if(l>=8) {l-=8;i+=8;}}
                // first optimization: for(;l<bitskip;l+=6){x++;} l=l%8;
                x += Math.ceil((bitskip - l) / 6);
                l = l % 8;

                if(l>0){b=decode64.e[inbytes.charAt(x)];}
            }
        }
    }
    return Math.floor(j/record_size);
}
// initialize decoder with static lookup table 'e'
decode64.S='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
decode64.e={};
for(var i=0;i<64;i++){decode64.e[decode64.S.charAt(i)]=i;}



*/
