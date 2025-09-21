import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh, Texture } from 'ogl';

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  currencySymbols?: string[];
  currencyColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  symbolRotationSpeed?: number;
  backgroundColor?: string;
  className?: string;
}

const defaultSymbols: string[] = ['$', '₹'];
const defaultColors: string[] = ['#ffd700', '#ffffff'];

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const createSymbolTexture = (gl: Renderer['gl'], symbols: string[], size: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    const symbolWidth = size;
    const symbolHeight = size;
    canvas.width = symbolWidth * symbols.length;
    canvas.height = symbolHeight;

    symbols.forEach((symbol, i) => {
        ctx.fillStyle = '#ffffff'; // Draw in white for tinting
        ctx.font = `bold ${size * 0.8}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol, symbolWidth * i + symbolWidth / 2, symbolHeight / 2 + size * 0.05);
    });

    return new Texture(gl, { image: canvas, generateMipmaps: false });
};


const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  attribute float symbolIndex;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec3 vColor;
  varying float vSymbolIndex;
  varying vec4 vRandom;
  
  void main() {
    vColor = color;
    vSymbolIndex = symbolIndex;
    vRandom = random;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;

    gl_PointSize = uBaseSize * (1.0 + uSizeRandomness * random.x) * (200.0 / -mvPos.z);
    
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform sampler2D tMap;
  uniform float uNumSymbols;
  uniform float uSymbolRotationSpeed;
  uniform float uTime;

  varying vec3 vColor;
  varying float vSymbolIndex;
  varying vec4 vRandom;
  
  void main() {
    vec2 centered_uv = gl_PointCoord - 0.5;

    float angle = uTime * uSymbolRotationSpeed * (vRandom.x * 2.0 - 1.0);
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    vec2 uv = rot * centered_uv + 0.5;

    uv.x = (uv.x + vSymbolIndex) / uNumSymbols;

    vec4 texColor = texture2D(tMap, uv);

    if (texColor.a < 0.1) discard;

    gl_FragColor = vec4(vColor, 1.0) * texColor;
  }
`;

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  currencySymbols,
  currencyColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 40,
  disableRotation = false,
  symbolRotationSpeed = 0.2,
  backgroundColor,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: 2, alpha: !backgroundColor });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    
    if (backgroundColor) {
      const [r, g, b] = hexToRgb(backgroundColor);
      gl.clearColor(r, g, b, 1);
    } else {
      gl.clearColor(0, 0, 0, 0);
    }

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize, false);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    const symbols = currencySymbols && currencySymbols.length > 0 ? currencySymbols : defaultSymbols;
    const colors = currencyColors && currencyColors.length > 0 ? currencyColors : defaultColors;
    const symbolTexture = createSymbolTexture(gl, symbols, 128);

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const particleColorsData = new Float32Array(count * 3);
    const symbolIndices = new Float32Array(count);


    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      
      const symbolIndex = Math.floor(Math.random() * symbols.length);
      symbolIndices.set([symbolIndex], i);

      const col = hexToRgb(colors[symbolIndex % colors.length]);
      particleColorsData.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: particleColorsData },
      symbolIndex: { size: 1, data: symbolIndices }
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        tMap: { value: symbolTexture },
        uNumSymbols: { value: symbols.length },
        uSymbolRotationSpeed: { value: symbolRotationSpeed },
      },
      transparent: true,
      depthTest: false
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId: number;
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      elapsed += speed;

      program.uniforms.uTime.value = elapsed * 0.1;

      if (moveParticlesOnHover) {
        particles.position.x += (-mouseRef.current.x * particleHoverFactor - particles.position.x) * 0.05;
        particles.position.y += (-mouseRef.current.y * particleHoverFactor - particles.position.y) * 0.05;
      }

      if (!disableRotation) {
        particles.rotation.y += 0.001 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover && container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container && gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    symbolRotationSpeed,
    currencySymbols,
    currencyColors,
    backgroundColor,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 40%, black 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 40%, black 70%)',
      }}
    />
  );
};

export default Particles;