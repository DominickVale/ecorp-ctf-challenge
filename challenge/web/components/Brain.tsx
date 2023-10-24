"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Float } from "@react-three/drei";
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useMount } from "react-use";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const { degToRad } = THREE.MathUtils;

const debugRot = { value: 0, min: -360, max: 360, step: 1 };
const speed = 1;
const rotationIntensity = 0.5;
const floatIntensity = 1;
const floatingRange = [-0.1, 0.1];

function BrainModel() {
    const brainRef = useRef<THREE.Mesh | null>(null);
    // const { xPos, yPos, zPos } = useControls({
    //     xPos: debugRot,
    //     yPos: debugRot,
    //     zPos: debugRot,
    // });
    const planeRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 0, 1), -200));
    const raycasterRef = useRef(new THREE.Raycaster());
    const pointOfIntersectionRef = useRef(new THREE.Vector3());
    const mouseRef = useRef(new THREE.Vector2());
    const rotationAppliedRef = useRef(false);

    const { camera, gl } = useThree();
    const { nodes, ...gltf } = useLoader(GLTFLoader, "/brain.gltf");

    function handleMouseMove(e: MouseEvent) {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }

    useEffect(() => {
        // "hack" since useFrame's mouse doesn't update when canvas loses focus.
        window.addEventListener("mousemove", handleMouseMove);
        if (nodes) {
            const brainGeometry = (nodes["brain"] as THREE.Mesh).geometry;
            if (brainGeometry && !rotationAppliedRef.current) {
                brainGeometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
                // needed to prevent unneeded rotation after hot reload
                rotationAppliedRef.current = true;
            }
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame(({ clock }) => {
        if (!brainRef.current || !mouseRef.current) return;

        // Intersect with plane
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        raycasterRef.current.ray.intersectPlane(planeRef.current, pointOfIntersectionRef.current);

        brainRef.current.lookAt(
            pointOfIntersectionRef.current.x,
            pointOfIntersectionRef.current.y,
            pointOfIntersectionRef.current.z
        );
    });

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            if (!brainRef.current) return;

            const animation = gsap.timeline();

            animation.to(brainRef.current.position, {
                x: -152,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "-5% top",
                    end: "bottom top",
                    immediateRender: false,
                    scrub: 1,
                },
            });
            animation.to(brainRef.current.position, {
                x: 210,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: {
                    trigger: "footer",
                    start: "top bottom",
                    end: "top top",
                    immediateRender: false,
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [camera]);

    return (
        <Float speed={3} rotationIntensity={0.1} floatIntensity={1} floatingRange={[-10, 10]}>
            <mesh
                ref={brainRef}
                geometry={(nodes["brain"] as THREE.Mesh).geometry}
                position={[180, 20, -20]}
            >
                <meshStandardMaterial color="##DDDFDF" wireframe />
            </mesh>
        </Float>
    );
}

extend({ OrbitControls });
function BrainBackground() {
    return (
        <Canvas
            camera={{
                fov: 60,
                position: [0, 0, 360],
            }}
        >
            <ambientLight />
            <BrainModel />
        </Canvas>
    );
}

export default BrainBackground;
