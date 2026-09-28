/**
 * 3D Ionic Crystal Lattice & Electron Transfer Simulation
 * Visualizes the face-centered cubic lattice of NaCl and electron transfer (Na 2,8,1 + Cl 2,8,7 -> Na+ + Cl-).
 */

import * as THREE from "three";

export class AtomLattice {
  constructor() {
    this.group = new THREE.Group();
    this.cameraPosition = new THREE.Vector3(0, 4, 11);
    this.transferProgress = 0;
    this.electronMesh = null;
    this.initLattice();
    this.initElectronTransfer();
  }

  initLattice() {
    this.latticeGroup = new THREE.Group();
    const naGeometry = new THREE.SphereGeometry(0.32, 24, 24);
    const clGeometry = new THREE.SphereGeometry(0.52, 24, 24);

    const naMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, // Violet for Na+
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.3
    });

    const clMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald Green for Cl-
      roughness: 0.3,
      metalness: 0.5,
      emissive: 0x064e3b,
      emissiveIntensity: 0.3
    });

    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.5
    });

    const spacing = 1.6;
    const offset = 1; // 3x3x3 grid centered at origin

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const isNa = (x + y + z) % 2 === 0;
          const sphere = new THREE.Mesh(
            isNa ? naGeometry : clGeometry,
            isNa ? naMaterial : clMaterial
          );
          const posX = (x - offset) * spacing;
          const posY = (y - offset) * spacing - 0.5;
          const posZ = (z - offset) * spacing;
          sphere.position.set(posX, posY, posZ);
          this.latticeGroup.add(sphere);

          // Horizontal X bond
          if (x < 2) {
            const bondGeom = new THREE.CylinderGeometry(0.04, 0.04, spacing, 8);
            const bond = new THREE.Mesh(bondGeom, bondMaterial);
            bond.position.set(posX + spacing / 2, posY, posZ);
            bond.rotation.z = Math.PI / 2;
            this.latticeGroup.add(bond);
          }
          // Vertical Y bond
          if (y < 2) {
            const bondGeom = new THREE.CylinderGeometry(0.04, 0.04, spacing, 8);
            const bond = new THREE.Mesh(bondGeom, bondMaterial);
            bond.position.set(posX, posY + spacing / 2, posZ);
            this.latticeGroup.add(bond);
          }
          // Depth Z bond
          if (z < 2) {
            const bondGeom = new THREE.CylinderGeometry(0.04, 0.04, spacing, 8);
            const bond = new THREE.Mesh(bondGeom, bondMaterial);
            bond.position.set(posX, posY, posZ + spacing / 2);
            bond.rotation.x = Math.PI / 2;
            this.latticeGroup.add(bond);
          }
        }
      }
    }

    this.group.add(this.latticeGroup);
  }

  initElectronTransfer() {
    this.transferGroup = new THREE.Group();
    this.transferGroup.position.set(0, 3.8, 0);

    // Sodium Donor Atom on the left
    const naAtomGeom = new THREE.SphereGeometry(0.65, 32, 32);
    const naAtomMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.5
    });
    const naAtom = new THREE.Mesh(naAtomGeom, naAtomMat);
    naAtom.position.set(-2.4, 0, 0);
    this.transferGroup.add(naAtom);

    // Chlorine Acceptor Atom on the right
    const clAtomGeom = new THREE.SphereGeometry(0.9, 32, 32);
    const clAtomMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.5
    });
    const clAtom = new THREE.Mesh(clAtomGeom, clAtomMat);
    clAtom.position.set(2.4, 0, 0);
    this.transferGroup.add(clAtom);

    // Electron Leaping Particle
    const electronGeom = new THREE.SphereGeometry(0.14, 16, 16);
    const electronMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    this.electronMesh = new THREE.Mesh(electronGeom, electronMat);
    this.transferGroup.add(this.electronMesh);

    // Electron orbit trail
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.4, 0, 0),
      new THREE.Vector3(-1.0, 1.2, 0),
      new THREE.Vector3(1.0, 1.2, 0),
      new THREE.Vector3(2.4, 0, 0)
    );
    this.electronCurve = curve;

    const points = curve.getPoints(40);
    const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineDashedMaterial({
      color: 0x00f2fe,
      dashSize: 0.2,
      gapSize: 0.1,
      transparent: true,
      opacity: 0.5
    });
    const trajectory = new THREE.Line(lineGeom, lineMat);
    trajectory.computeLineDistances();
    this.transferGroup.add(trajectory);

    this.group.add(this.transferGroup);
  }

  update() {
    if (this.latticeGroup) {
      this.latticeGroup.rotation.y += 0.005;
      this.latticeGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15;
    }

    if (this.electronMesh && this.electronCurve) {
      this.transferProgress = (this.transferProgress + 0.008) % 1;
      const point = this.electronCurve.getPoint(this.transferProgress);
      this.electronMesh.position.copy(point);
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
