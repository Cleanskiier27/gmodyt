import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Grid } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { Smartphone, Globe } from 'lucide-react';

function RotatingGrid() {
    const gridRef = useRef();
    useFrame((state, delta) => {
        if (gridRef.current) {
            gridRef.current.rotation.y += delta * 0.05;
        }
    });
    return (
        <group ref={gridRef} rotation={[-Math.PI / 4, 0, 0]}>
            <Grid
                args={[100, 100]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#00f0ff"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#ff003c"
                fadeDistance={50}
            />
        </group>
    );
}

function FloatingCube() {
    const meshRef = useRef();
    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <mesh ref={meshRef} position={[0, 2, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial wireframe color="white" />
        </mesh>
    );
}

// Mobile Avatar Portal - represents connected users worldwide
function MobilePortal({ position, rotation }) {
    const portalRef = useRef();
    useFrame((state, delta) => {
        if (portalRef.current) {
            portalRef.current.rotation.z += delta * 1.5;
            portalRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
        }
    });

    return (
        <group ref={portalRef} position={position} rotation={rotation}>
            <mesh>
                <torusGeometry args={[1, 0.15, 16, 32]} />
                <meshStandardMaterial color="#00f0ff" emissive="#0088ff" emissiveIntensity={1.5} wireframe={false} />
            </mesh>
            <mesh scale={0.7}>
                <boxGeometry args={[0.8, 1.2, 0.1]} />
                <meshStandardMaterial color="#ff003c" emissive="#ff0055" emissiveIntensity={1} transparent opacity={0.7} />
            </mesh>
        </group>
    );
}

// Global network nodes - representing different regions
function GlobalNetworkNodes() {
    const nodesRef = useRef();
    useFrame((state) => {
        if (nodesRef.current) {
            nodesRef.current.rotation.y += 0.0005;
        }
    });

    // Representing global regions
    const regions = [
        { position: [-15, 0, 5], label: 'North America' },
        { position: [10, 3, 15], label: 'Europe' },
        { position: [18, -2, -8], label: 'Asia' },
        { position: [-8, -5, -15], label: 'South America' },
        { position: [5, -8, 12], label: 'Africa' },
        { position: [-12, 6, -10], label: 'Oceania' },
    ];

    return (
        <group ref={nodesRef}>
            {regions.map((region, idx) => (
                <group key={idx} position={region.position}>
                    <mesh>
                        <sphereGeometry args={[0.5, 16, 16]} />
                        <meshStandardMaterial 
                            color="#00f0ff" 
                            emissive="#0088ff" 
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                    {/* Connecting lines to center */}
                    <line>
                        <geometry attach="geometry">
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    count={2}
                                    array={new Float32Array([
                                        region.position[0], region.position[1], region.position[2],
                                        0, 0, 0
                                    ])}
                                    itemSize={3}
                                />
                            </bufferGeometry>
                        </geometry>
                        <lineBasicMaterial color="#ff003c" linewidth={2} />
                    </line>
                </group>
            ))}
        </group>
    );
}

export default function AvatarWorld() {
    const [isMobile, setIsMobile] = useState(false);
    const [userLocation, setUserLocation] = useState('Unknown');

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            setIsMobile(mobileRegex.test(navigator.userAgent) || window.innerWidth < 768);
        };

        // Get approximate user location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Reverse geocoding approximation
                    const regions = {
                        'North America': [-90, 45],
                        'Europe': [10, 50],
                        'Asia': [100, 30],
                        'South America': [-60, -15],
                        'Africa': [20, 0],
                        'Oceania': [135, -25]
                    };

                    let closest = 'Unknown';
                    let minDist = Infinity;
                    for (const [region, coords] of Object.entries(regions)) {
                        const dist = Math.abs(latitude - coords[1]) + Math.abs(longitude - coords[0]);
                        if (dist < minDist) {
                            minDist = dist;
                            closest = region;
                        }
                    }
                    setUserLocation(closest);
                }
            );
        }

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="absolute inset-0 -z-10">
            <Canvas 
                camera={{ 
                    position: isMobile ? [0, 3, 8] : [0, 5, 10], 
                    fov: isMobile ? 45 : 60 
                }}
                gl={{ antialias: true }}
            >
                <fog attach="fog" args={['#050505', 10, 60]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff003c" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <RotatingGrid />
                <FloatingCube />
                
                {/* Global Network Visualization */}
                <GlobalNetworkNodes />

                {/* Mobile Portal Nodes - representing worldwide cell phone users */}
                <MobilePortal position={[-12, 4, 8]} rotation={[0, 0, 0]} />
                <MobilePortal position={[8, -3, 12]} rotation={[0, Math.PI / 4, 0]} />
                <MobilePortal position={[15, 2, -8]} rotation={[0, Math.PI / 2, 0]} />
                <MobilePortal position={[-8, -6, -10]} rotation={[0, Math.PI / 3, 0]} />
                <MobilePortal position={[5, 5, 0]} rotation={[0, Math.PI / 6, 0]} />
                <MobilePortal position={[-15, -2, 15]} rotation={[0, Math.PI / 8, 0]} />

                <OrbitControls 
                    autoRotate 
                    autoRotateSpeed={isMobile ? 1 : 0.5} 
                    enableZoom={!isMobile}
                    enablePan={!isMobile}
                    touches={{
                        ONE: 2,
                        TWO: 3
                    }}
                />
            </Canvas>

            {/* Mobile Info Overlay */}
            {isMobile && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 z-20 pointer-events-none">
                    <div className="flex items-center gap-2 text-[#00f0ff] text-sm">
                        <Smartphone size={16} />
                        <span>Mobile Avatar World - Connected from {userLocation}</span>
                    </div>
                </div>
            )}

            {/* Desktop Global Users Info */}
            {!isMobile && (
                <div className="absolute top-4 right-4 glass-panel px-4 py-3 z-20 pointer-events-none text-xs">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe size={14} className="text-[#00f0ff]" />
                        <span className="text-[#00f0ff] font-bold">GLOBAL MOBILE NETWORK</span>
                    </div>
                    <div className="text-[#00f0ff] space-y-1">
                        <div>🌐 Users Worldwide: Live Feed</div>
                        <div>📱 Mobile Portals: 6 Active Regions</div>
                        <div>🔗 Network Status: Connected</div>
                        <div>👤 Your Location: {userLocation}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
