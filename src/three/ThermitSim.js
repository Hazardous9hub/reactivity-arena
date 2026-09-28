/**
 * 3D Thermit Welding Reaction Simulation
 * Illustrates Fe₂O₃(s) + 2Al(s) -> 2Fe(l) + Al₂O₃(s) + Immense Heat.
 * Shows railway track joint, conical crucible, sparks, and molten iron puddle.
 */

import * as THREE from "three";

export class ThermitSim {
  constructor() {
    this.group = new THREE.Group();
    this.cameraPosition = new THREE.Vector3(0, 3, 9);
    this.sparkParticles = null;
    this.initRailwayTrack();
    this.initCrucible();
    this.initMoltenPuddle();
    this.initSparkEmitters();
  }

  initRailwayTrack() {
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Dark steel
      roughness: 0.4,
      metalness: 0.8
    });

    // Left Rail
    const leftRailGeom = new THREE.BoxGeometry(4.5, 0.7, 0.8);
    const leftRail = new THREE.Mesh(leftRailGeom, trackMat);
    leftRail.position.set(-2.8, -1.8, 0);
    this.group.add(leftRail);

    // Right Rail
    const rightRailGeom = new THREE.BoxGeometry(4.5, 0.7, 0.8);
    const rightRail = new THREE.Mesh(rightRailGeom, trackMat);
    rightRail.position.set(2.8, -1.8, 0);
    this.group.add(rightRail);

    // Sleepers (Wood/Concrete base)
    const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.9 });
    for (let i = -4; i <= 4; i += 2) {
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 2.5), sleeperMat);
      sleeper.position.set(i, -2.3, 0);
      this.group.add(sleeper);
    }
  }

  initCrucible() {
    // Conical Refractory Crucible above the rail joint
    const crucibleGeom = new THREE.ConeGeometry(1.2, 2.0, 16, 1, true);
    const crucibleMat = new THREE.MeshStandardMaterial({
      color: 0x78350f, // Terracotta refractory clay
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    const crucible = new THREE.Mesh(crucibleGeom, crucibleMat);
    crucible.position.set(0, 1.4, 0);
    crucible.rotation.x = Math.PI; // upside down funnel
    this.group.add(crucible);

    // Internal reaction core glow
    const coreGeom = new THREE.SphereGeometry(0.5, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    const core = new THREE.Mesh(coreGeom, coreMat);
    core.position.set(0, 1.4, 0);
    this.group.add(core);

    // Point Light for fierce reaction illumination
    this.reactionLight = new THREE.PointLight(0xf97316, 3, 15);
    this.reactionLight.position.set(0, 1.2, 0);
    this.group.add(this.reactionLight);
  }

  initMoltenPuddle() {
    // Molten Iron weld filling the gap between rails
    const puddleGeom = new THREE.BoxGeometry(1.1, 0.72, 0.82);
    this.puddleMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // Blinding yellow-orange molten iron
      emissive: 0xea580c,
      emissiveIntensity: 0.85,
      roughness: 0.2
    });
    const puddle = new THREE.Mesh(puddleGeom, this.puddleMat);
    puddle.position.set(0, -1.8, 0);
    this.group.add(puddle);
  }

  initSparkEmitters() {
    const count = 120;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    this.velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0.5 + Math.random() * 0.8;
      positions[i * 3 + 2] = 0;

      this.velocities.push({
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.05 - Math.random() * 0.08,
        vz: (Math.random() - 0.5) * 0.08
      });
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.12,
      transparent: true,
      opacity: 0.9
    });

    this.sparkParticles = new THREE.Points(geom, mat);
    this.group.add(this.sparkParticles);
  }

  update() {
    this.group.rotation.y = Math.sin(Date.now() * 0.0003) * 0.25;

    // Pulse the reaction light
    if (this.reactionLight) {
      this.reactionLight.intensity = 2.5 + Math.sin(Date.now() * 0.02) * 1.0;
    }

    // Animate falling sparks
    if (this.sparkParticles) {
      const pos = this.sparkParticles.geometry.attributes.position.array;
      for (let i = 0; i < this.velocities.length; i++) {
        pos[i * 3] += this.velocities[i].vx;
        pos[i * 3 + 1] += this.velocities[i].vy;
        pos[i * 3 + 2] += this.velocities[i].vz;

        // Reset spark when it reaches the bottom
        if (pos[i * 3 + 1] < -1.8) {
          pos[i * 3] = (Math.random() - 0.5) * 0.3;
          pos[i * 3 + 1] = 0.8 + Math.random() * 0.5;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
      }
      this.sparkParticles.geometry.attributes.position.needsUpdate = true;
    }
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
