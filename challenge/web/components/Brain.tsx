"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useControls } from "leva";
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
    const { xPos, yPos, zPos } = useControls({
        xPos: debugRot,
        yPos: debugRot,
        zPos: debugRot,
    });
    const planeRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0,0,1), window.innerWidth));
    const raycasterRef = useRef(new THREE.Raycaster());
    const pointOfIntersectionRef = useRef(new THREE.Vector3());

    const { camera, gl } = useThree();
    const { nodes, ...gltf } = useLoader(GLTFLoader, "/brain.gltf");

    const offset = React.useRef(Math.random() * 10000);

    console.log("Rerendered", camera);
    
    // useEffect(() => {
    //     window.addEventListener("mousemove", (event) => {
    //         if (!brainRef.current || !planeRef.current) return;
    //         const mouse = new THREE.Vector2();
    //         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //         raycasterRef.current.setFromCamera(mouse, camera);
    //         raycasterRef.current.ray.intersectPlane(
    //             planeRef.current,
    //             pointOfIntersectionRef.current
    //         );
    //         brainRef.current.lookAt(pointOfIntersectionRef.current);
    //     });
    // }, []);
    
    useEffect(() => {
        if (nodes) {
            const brainGeometry = (nodes["brain"] as THREE.Mesh).geometry;
            if (brainGeometry) {
                // brainGeometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
            }
        }
    }, [nodes]);

    useFrame(({ mouse, clock }) => { 
        if (brainRef.current && planeRef.current) {
            raycasterRef.current.setFromCamera(mouse, camera);
            raycasterRef.current.ray.intersectPlane(
                planeRef.current,
                pointOfIntersectionRef.current
            );
            console.log("pointOfIntersectionRef: ", pointOfIntersectionRef.current);
            
            brainRef.current.lookAt(
               pointOfIntersectionRef.current.x,
                pointOfIntersectionRef.current.y,
               - pointOfIntersectionRef.current.z
            );
        }
    });

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            if (!brainRef.current) return;

            const animation = gsap.timeline();

            const brainPosScrollTrigger: ScrollTrigger.Vars = {
                trigger: "#hero",
                start: "-5% top",
                end: "bottom top",
                immediateRender: false,
                scrub: 1,
            };
            animation.to(brainRef.current.position, {
                x: -152,
                y: 13,
                z: -350,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: brainPosScrollTrigger,
            });
            animation.to(
                brainRef.current.rotation,
                {
                    z: degToRad(180),
                    duration: 0.5,
                    ease: "linear",
                    scrollTrigger: brainPosScrollTrigger,
                },
                "<"
            );
        });

        return () => ctx.revert();
    }, [camera]);

    return (
        <>
            <mesh
                ref={brainRef}
                geometry={(nodes["brain"] as THREE.Mesh).geometry}
                // rotation={[degToRad(xPos), degToRad(yPos), degToRad(zPos)]}
                // rotation={[1.5707, 0, 0]}
                // position={[xPos,yPos,zPos]}
                position={[180, 20, -20]}
            >
                <meshStandardMaterial color="#b6b6b6" wireframe />
            </mesh>
            <planeHelper args={[planeRef.current, 500, 0xff0000]} />
        </>
    );
}

extend({ OrbitControls });
function BrainBackground() {
    return (
        <Canvas
            camera={{
                fov: 60,
                position: [0, 0, 360]
            }}
        >
            <ambientLight />
            <BrainModel />
        </Canvas>
    );
}

export default BrainBackground;
