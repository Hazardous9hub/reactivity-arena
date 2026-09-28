/**
 * 3D Electrolytic Copper Refining Cell Simulation
 * Illustrates:
 * - Thick Impure Copper ANODE (Cu -> Cu²⁺ + 2e⁻)
 * - Thin Pure Copper CATHODE (Cu²⁺ + 2e⁻ -> Cu)
 * - Blue Acidified CuSO₄ Electrolyte
 * - Anode Mud (insoluble Au, Ag impurities) at the bottom
 */

import * as THREE from "three";

export class RefiningCell {
  constructor() {
    this.group = new THREE.Group();
    this.cameraPosition = new THREE.Vector3(0, 3, 10);
    this.ions = [];
    this.initTank();
    this.initElectrodes();
    this.initMigratingIons();
  }

  initTank() {
    // Glass Tank Container
    const tankGeom = new THREE.BoxGeometry(6, 4.5, 3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.35,
      transparent: true,
      roughness: 0.1,
      ior: 1.45,
      side: THREE.DoubleSide
    });
    const tank = new THREE.Mesh(tankGeom, glassMat);
    tank.position.set(0, 0, 0);
    this.group.add(tank);

    // Blue Acidified CuSO4 Liquid Solution
    const liquidGeom = new THREE.BoxGeometry(5.8, 3.8, 2.8);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vivid blue
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1
    });
    const liquid = new THREE.Mesh(liquidGeom, liquidMat);
    liquid.position.set(0, -0.3, 0);
    this.group.add(liquid);

    // Tank Base
    const baseGeom = new THREE.BoxGeometry(6.4, 0.4, 3.4);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.set(0, -2.4, 0);
    this.group.add(base);
  }

  initElectrodes() {
    // 1. Thick Impure Copper Anode (Left)
    const anodeGeom = new THREE.BoxGeometry(0.7, 4.0, 1.6);
    const anodeMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Dark weathered copper
      roughness: 0.6,
      metalness: 0.7
    });
    const anode = new THREE.Mesh(anodeGeom, anodeMat);
    anode.position.set(-1.8, 0.2, 0);
    this.group.add(anode);

    // 2. Thin Pure Copper Cathode (Right)
    const cathodeGeom = new THREE.BoxGeometry(0.15, 4.0, 1.6);
    const cathodeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Bright fresh copper
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x9a3412,
      emissiveIntensity: 0.2
    });
    const cathode = new THREE.Mesh(cathodeGeom, cathodeMat);
    cathode.position.set(1.8, 0.2, 0);
    this.group.add(cathode);

    // 3. Anode Mud (Insoluble Ag, Au impurities underneath anode)
    const mudGeom = new THREE.BoxGeometry(1.2, 0.25, 1.8);
    const mudMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Grayish sludge
      roughness: 0.9
    });
    const mud = new THREE.Mesh(mudGeom, mudMat);
    mud.position.set(-1.8, -2.0, 0);
    this.group.add(mud);

    // 4. Circuit Connecting Wires & Battery on top
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    const wireGeom = new THREE.CylinderGeometry(0.04, 0.04, 3.6, 8);
    const topWire = new THREE.Mesh(wireGeom, wireMat);
    topWire.position.set(0, 2.6, 0);
    topWire.rotation.z = Math.PI / 2;
    this.group.add(topWire);

    // Battery block in center
    const batteryGeom = new THREE.BoxGeometry(0.8, 0.4, 0.4);
    const batteryMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8 });
    const battery = new THREE.Mesh(batteryGeom, batteryMat);
    battery.position.set(0, 2.6, 0);
    this.group.add(battery);
  }

  initMigratingIons() {
    const ionGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const ionMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < 20; i++) {
      const ion = new THREE.Mesh(ionGeom, ionMat);
      ion.position.set(
        -1.5 + Math.random() * 3.0,
        -1.5 + Math.random() * 2.8,
        -0.8 + Math.random() * 1.6
      );
      ion.userData = {
        speed: 0.015 + Math.random() * 0.02,
        startX: -1.5,
        endX: 1.7,
        origY: ion.position.y,
        origZ: ion.position.z
      };
      this.ions.push(ion);
      this.group.add(ion);
    }
  }

  update() {
    this.group.rotation.y = Math.sin(Date.now() * 0.0004) * 0.2;

    this.ions.forEach((ion) => {
      ion.position.x += ion.userData.speed;
      ion.position.y = ion.userData.origY + Math.sin(Date.now() * 0.003 + ion.position.x) * 0.1;
      if (ion.position.x > ion.userData.endX) {
        ion.position.x = ion.userData.startX;
      }
    });
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
  }
}
