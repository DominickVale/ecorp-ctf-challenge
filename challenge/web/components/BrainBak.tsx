
"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, extend, useFrame, useLoader, useScroll, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useMount } from "react-use";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const { degToRad } = THREE.MathUtils;

const debugRot = { value: 0, min: -360, max: 360, step: 0.01 };
const speed = 1;
const rotationIntensity = 0.5;
const floatIntensity = 1;
const floatingRange = [-0.1, 0.1];

function BrainModel() {
    const brainRef = useRef<THREE.Mesh | null>(null);
    const { xPos, yPos, zPos } = useControls({
        xPos: debugRot,
        yPos: debugRot,
        zPos: debugRot,
    });
    const { camera, gl } = useThree();
    const scrollProgress = useRef(0);
    const offset = useRef(0);

    const { nodes, ...gltf } = useLoader(GLTFLoader, "/brain.gltf");

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollHeight = document.body.clientHeight - window.innerHeight;
        scrollProgress.current = scrollY / scrollHeight;
    };

    // Add a scroll event listener to update the scroll progress
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useFrame(({ pointer, clock }) => {
        if (brainRef.current) {
            const iw = window.innerWidth;
            let scaleFactor = window.innerWidth / 1000;
            if (window.innerWidth > 3000) {
                scaleFactor = 1;
            } else if (window.innerWidth > 2560) {
                scaleFactor -= scaleFactor * 0.65;
            } else if (window.innerWidth > 1920) {
                scaleFactor -= scaleFactor * 0.58;
            } else if (window.innerWidth > 0) {
                scaleFactor -= scaleFactor * 0.5;
            }

            brainRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

            // camera.position.set(
            // Math.sin(scrOff),
            // Math.atan(scrOff * Math.PI * 2) * 5,
            // Math.cos((scrOff * Math.PI) / 3) * -10
            // );

            // camera.position.set(
            //     xPos,
            //     yPos,
            //     zPos,
            // );
            // console.log(camera.position);

            // camera.lookAt(brainRef.current.position);

            // brainRef.current.rotation.set(newRot.x, newRot.y, newRot.z)
            const newPos = new THREE.Vector3();
            newPos.copy(brainRef.current.position);
            newPos.x = Math.max(150 - ( 263 * ( scrOff * 4 ) ), -150);

            const newRot = new THREE.Euler()
            newRot.copy(brainRef.current.rotation)
            newRot.z = Math.min(degToRad(180) * scrOff * 3, degToRad(180))
            

            const mX = pointer.x / 2;
            const mY = pointer.y / 2;

            const t = offset.current + clock.getElapsedTime();
            brainRef.current.rotation.x =
                1.5707 + (Math.cos((t / 4) * speed) / 8) * rotationIntensity;
            brainRef.current.rotation.y = -mY + (Math.sin((t / 4) * speed) / 8) * rotationIntensity;
            brainRef.current.rotation.z =
                -mX + (Math.sin((t / 4) * speed) / 20) * rotationIntensity;
            let yPosition = Math.sin((t / 4) * speed) / 10;
            yPosition = THREE.MathUtils.mapLinear(
                yPosition,
                -0.1,
                0.1,
                floatingRange?.[0] ?? -0.1,
                floatingRange?.[1] ?? 0.1
            );
            brainRef.current.position.y = yPosition * floatIntensity;

            brainRef.current.position.set(newPos.x, newPos.y, newPos.z);
            brainRef.current.rotation.set(newRot.x, newRot.y, newRot.z)
            brainRef.current.updateMatrix();

            // animation.to(camera.position, {
            //     x: 263,
            //     y: 13,
            //     z: 0,
            //     duration: 0.5,
            //     ease: "linear",
            //     scrollTrigger: brainPosScrollTrigger,
            //   });
            // animation.to(
            //     camera.rotation,
            //     {
            //         z: degToRad(180),
            //         duration: 0.5,
            //         ease: "linear",
            //         scrollTrigger: brainPosScrollTrigger,
            //     },
            //     "<"
            // );
        }
    });

    return (
        <>
            <mesh
                ref={brainRef}
                geometry={(nodes["brain"] as THREE.Mesh).geometry}
                // rotation={[degToRad(xPos), degToRad(yPos), degToRad(zPos)]}
                rotation={[1.5707, 0, 0]}
                // position={[xPos,yPos,zPos]}
                position={[150, 20, -360]}
            >
                <meshStandardMaterial color="#b6b6b6" wireframe />
            </mesh>
        </>
    );
}

extend({ OrbitControls });
function BrainBackground() {
    return (
        <Canvas
            camera={{
                fov: 45,
            }}
        >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <BrainModel />
        </Canvas>
    );
}

export default BrainBackground;
