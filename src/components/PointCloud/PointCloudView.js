import React, {useState, useMemo, useRef} from "react";
import ROSLIB from "roslib/src/RosLib";
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Stars} from '@react-three/drei'
import './dotmaterial'

const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090'});
const pointCloudTopic = new ROSLIB.Topic({ros:ros, name: '/os_cloud_node/points', messageType: 'sensor_msgs/PointCloud2'});

function Particles({pointCloud}) {
    const [coords, sizes] = useMemo(() => {
        const initialCoords = []
        const initialSizes = []
        for (let y = 0; y < 50; y += 1) {
            for (let x = 0; x < 50; x += 1) {
                initialCoords.push(x)
                initialCoords.push(y)
                initialSizes.push(5)
            }
        }
        const coords = new Float32Array(initialCoords)
        const sizes = new Float32Array(initialSizes)
        return [coords, sizes]
    }, [])
    return (
        <points position={[0, -25, 0]} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
          <bufferGeometry>
            <bufferAttribute attachObject={["attributes", "position"]} count={coords.length / 2} array={coords} itemSize={2} />
            <bufferAttribute attachObject={["attributes", "size"]} count={sizes.length} array={sizes} itemSize={1} />
          </bufferGeometry>
          <dotMaterial />
        </points>
    )
}

const resize_array_right = (array, length, fill_with) => array.concat((new Array(length)).fill(fill_with)).slice(0, length);


export default function PointCloudView(props){
    const [isSub, setIsSub] = useState(false);
    const [pointCloud, setPointCloud] = useState([]);
    const [positions, setPositions] = useState(new Float32Array(100000 * 3));
    const [ pointSize, setPointSize ] = useState(0);
    const geometry = useRef();
    let tempPos = [];
    let buffer = null;
    let n = 0;

    const updatePoints = (verticies) => { //, colors
        if (verticies.length <= positions.length) {
            //if (!isMounted.current) return null
            setPositions(new Float32Array(verticies));
            //setPointColors(new Float32Array(colors));
            setPointSize(props.size);
            if (geometry.current) {
                geometry.current.attributes.position.needsUpdate = true;
                //geometry.current.attributes.color.needsUpdate = true;
            }
        }
    }

    if(!isSub && props.sub){
        setIsSub(true);
        tempPos.length = 0;
        tempPos = [];
        
        pointCloudTopic.subscribe(function(message){
            console.log(message)
            if(message.data) {
                buffer = message.data.split('');
                n = Math.min(message.height * message.width / 1);
            }
            if (tempPos.length < n) {
                resize_array_right(tempPos, n, 0);
            }
            var buf = new Float32Array(buffer);
            var dv = new DataView(buf);
            var little_endian = !message.is_bigendian;
            var byte_offset;
            for (var i = 0; i < n; i++) {
                for (var f in message.fields) {
                    byte_offset = i * 1 * message.point_step + Number(message.fields[f].offset);
                    tempPos[Number(3*i)+Number(f)] = dv.getFloat32(byte_offset, little_endian);
                } 
            }
            updatePoints(tempPos);
        });
    }
    if(isSub && !props.sub){
        setIsSub(false);
        pointCloudTopic.unsubscribe();
    }

    return(
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
    )

}