import * as THREE from "three"
import { extend } from "@react-three/fiber"

class DotMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      uniforms: { time: { value: 1 } },
      vertexShader: `uniform float time;
      attribute float size;
      void main() {
        float PI = 3.1415926538;
        float x = position.x;
        float y = position.y;
        float z = position.z;
        vec3 pos = vec3(
          x,
          y,
          z
        );
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
        gl_PointSize = size;
      }`,
      fragmentShader: `uniform float time;
      void main() {
        gl_FragColor = vec4(vec3(1.,1.,1.), step(length(gl_PointCoord.xy - vec2(0.5)), 0.5));
      }`
    })
  }
}

extend({ DotMaterial })
