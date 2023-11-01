import React, { useEffect, useRef, useState } from "react";
import { Float, FloatProps, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useWindowSize } from "react-use";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { degToRad } from "three/src/math/MathUtils";

type GLTFResult = {
    nodes: {
        brain: THREE.Mesh;
    };
} & GLTF;

type BrainModelProps = {
    wireframeColor?: string;
    dotsColor?: string;
    followMouse?: boolean;
} & FloatProps;

const ANIM_DAMPEN_RATIO = 0.4;
const ANIM_DAMPEN_TSTEP = 0.1;

const BrainModel = React.forwardRef<THREE.Mesh | undefined, BrainModelProps>((props, ref) => {
    const { wireframeColor, dotsColor, followMouse = true } = props;
    const { camera } = useThree();
    const { nodes } = useGLTF("/brain.gltf") as GLTFResult;
    const [brainLoaded, setBrainLoaded] = useState(false);

    const brainRef = useRef<THREE.Mesh | null>(null);
    const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -200));
    const raycasterRef = useRef(new THREE.Raycaster());
    const pointOfIntersectionRef = useRef(new THREE.Vector3());

    const currentLookAt = useRef(new THREE.Vector3());
    const mouseRef = useRef(new THREE.Vector2());

    const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);

    const { width, height } = useWindowSize();
    const isDesktop = width > 1000;

    // I still haven't figured out why i can't rotate the <Float group component directly... but k.
    React.useImperativeHandle(ref, () => brainRef.current || undefined);

    function handleMouseMove(e: MouseEvent) {
        mouseRef.current.x = (e.clientX / width) * 2 - 1;
        mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }

    useEffect(() => {
        // "hack" since useFrame's mouse doesn't update when canvas loses focus.
        window.addEventListener("mousemove", handleMouseMove);
        if (brainRef.current && instancedMeshRef.current && brainLoaded) {
            const positions = brainRef.current.geometry.attributes.position.array;
            const count = positions.length / 3;

            instancedMeshRef.current.count = count;
            const dummy = new THREE.Object3D();

            for (let i = 0; i < count; i++) {
                dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                dummy.updateMatrix();
                instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
            }

            instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [brainLoaded]);

    useEffect(() => {
        if (brainRef.current) setBrainLoaded(true);
    }, [brainRef.current]);

    useFrame(({ events }) => {
        const mouse = mouseRef.current;
        if (events?.update) events.update();
        if (!brainRef.current || !mouse) return;

        let scaleFactor = width / 1000;
        if (width > 3000) {
            scaleFactor = 1;
        } else if (width > 2560) {
            scaleFactor -= scaleFactor * 0.65;
        } else if (width > 1920) {
            scaleFactor -= scaleFactor * 0.58;
        } else if (width > 720) {
            scaleFactor -= scaleFactor * 0.45;
        } else if (width > 0) {
            scaleFactor -= scaleFactor * 0.2;
        }

        brainRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

        if (isDesktop && followMouse) {
            // Intersect with plane
            raycasterRef.current.setFromCamera(mouse, camera);
            raycasterRef.current.ray.intersectPlane(
                planeRef.current,
                pointOfIntersectionRef.current
            );

            // Dampen currentLookAt towards the point of intersection
            currentLookAt.current.x = THREE.MathUtils.damp(
                currentLookAt.current.x,
                pointOfIntersectionRef.current.x,
                ANIM_DAMPEN_RATIO,
                ANIM_DAMPEN_TSTEP
            );
            currentLookAt.current.y = THREE.MathUtils.damp(
                currentLookAt.current.y,
                pointOfIntersectionRef.current.y,
                ANIM_DAMPEN_RATIO,
                ANIM_DAMPEN_TSTEP
            );
            currentLookAt.current.z = THREE.MathUtils.damp(
                currentLookAt.current.z,
                pointOfIntersectionRef.current.z,
                ANIM_DAMPEN_RATIO,
                ANIM_DAMPEN_TSTEP
            );

            // Update the lookAt position
            brainRef.current.lookAt(currentLookAt.current);
        }

        if (brainRef.current && instancedMeshRef.current) {
            instancedMeshRef.current.position.copy(brainRef.current.position);
            instancedMeshRef.current.rotation.copy(brainRef.current.rotation);
            instancedMeshRef.current.scale.copy(brainRef.current.scale);
        }
    });

    return (
        <Float
            speed={3}
            rotationIntensity={0.3}
            floatIntensity={1}
            floatingRange={isDesktop ? [-10, 10] : [-5, 5]}
            {...props}
        >
            <group>
                <mesh
                    ref={brainRef}
                    geometry={(nodes["brain"] as THREE.Mesh).geometry}
                    position={isDesktop ? [200, 25, -20] : [0, height / 10, 0]}
                    rotation={isDesktop ? undefined : [0, degToRad(-85), 0]}
                >
                    <meshBasicMaterial color={wireframeColor || "#969494"} wireframe />
                </mesh>

                {brainLoaded && (
                    <instancedMesh
                        ref={instancedMeshRef}
                        args={[
                            undefined,
                            undefined,
                            brainRef.current?.geometry.attributes.position.count || 3000,
                        ]}
                    >
                        <icosahedronGeometry args={[1.2, 4]} />
                        <meshBasicMaterial color={dotsColor || "#333"} />
                    </instancedMesh>
                )}
            </group>
        </Float>
    );
});

export default BrainModel;
