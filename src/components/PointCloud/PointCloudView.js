import React, {useState, useRef, useMemo} from "react";
import ROSLIB from "roslib/src/RosLib";
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei'
import './dotmaterial'

const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090'});
const pointCloudTopic = new ROSLIB.Topic({ros:ros, name: '/os_cloud_node/points', messageType: 'sensor_msgs/PointCloud2', compression: 'cbor', queue_length: 1,});

const resize_array_right = (array, length, fill_with) => array.concat((new Array(length)).fill(fill_with)).slice(0, length);

function Particles({pointCloud}) {
    const [coords, sizes] = useMemo(() => {
        /*
        const initialCoords = []
        const initialSizes = []
        for (let y = 0; y < 50; y += 1) {
            for (let x = 0; x < 50; x += 1) {
                initialCoords.push(x)
                initialCoords.push(y)
                initialSizes.push(5)
            }
        }
        */
        const coords = pointCloud
        const sizes = new Float32Array(pointCloud.length).fill(1);
        return [coords, sizes]
    }, [])
    return (
        <points position={[0, 10, 0]} >
          <bufferGeometry>
            <bufferAttribute attachObject={["attributes", "position"]} count={coords.length / 3} array={coords} itemSize={3} />
            <bufferAttribute attachObject={["attributes", "size"]} count={sizes.length} array={sizes} itemSize={1} />
          </bufferGeometry>
          <dotMaterial />
        </points>
    )
}
//rotation={[-Math.PI / 4, 0, Math.PI / 6]}

export default function PointCloudView(props){
    const [isSub, setIsSub] = useState(false);
    let [positions, setPositions] = useState(new Float32Array(10000 * 3));
    const geometry = useRef();
    const frame = useRef();
    let tempPos = [];
    let buffer = [];

    if(!isSub && props.sub){
        setIsSub(true);
        
        pointCloudTopic.subscribe(function(message){
            var bufSz = 10000 * message.point_step;
            let n = 0;
            if(message.data.buffer) {
                buffer = message.data.slice(0, Math.min(message.data.byteLength, bufSz));
                n = Math.min(message.height * message.width, positions.length / 3);
            }
            if(positions.length < n){
                resize_array_right(positions, n, 0);
            }
            
            var dv = new DataView(buffer.buffer);
            var little_endian = !message.is_bigendian;
            var x = message.fields[0].offset;
            var y = message.fields[1].offset;
            var z = message.fields[2].offset;
            var base;
            for (var i = 0; i < n; i++) {
                base = i * message.point_step;
                positions[3*i] = dv.getFloat32(base+x, little_endian);
                positions[3*i+1] = dv.getFloat32(base+y, little_endian);
                positions[3*i+2] = dv.getFloat32(base+z, little_endian);
            }
            setPositions( new Float32Array(positions));
        });
    } 

    if(isSub && !props.sub){
        setIsSub(false);
        pointCloudTopic.unsubscribe();
    }

    return(
        <Canvas>
            <OrbitControls/>
            <Particles pointCloud={positions}/>
        </Canvas>
        
    )

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