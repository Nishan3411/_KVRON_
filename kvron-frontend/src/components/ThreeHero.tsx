import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Premium luxury fashion mannequin — bomber jacket, cargo pants, sneakers.
 * Full body, strong silhouette, slow rotation, float, mouse parallax,
 * cinematic showroom lighting with soft gold rim.
 */
export function ThreeHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(
      28,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ---------- Lighting (luxury showroom) ----------
    scene.add(new THREE.AmbientLight(0x141414, 1));

    const key = new THREE.SpotLight(0xfff0d0, 26, 26, Math.PI / 5.5, 0.5, 1.2);
    key.position.set(4, 7, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0005;
    scene.add(key);

    const goldRim = new THREE.PointLight(0xffc107, 8, 14);
    goldRim.position.set(-4, 2.5, -1.5);
    scene.add(goldRim);

    const backRim = new THREE.PointLight(0xffffff, 3, 10);
    backRim.position.set(2, 4, -3);
    scene.add(backRim);

    const fill = new THREE.PointLight(0x6688aa, 1.5, 12);
    fill.position.set(-3, -1, 4);
    scene.add(fill);

    // Black glossy floor
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(6, 64),
      new THREE.MeshPhysicalMaterial({
        color: 0x050505,
        roughness: 0.25,
        metalness: 0.4,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.4;
    floor.receiveShadow = true;
    scene.add(floor);

    // ---------- Gold KVRON chest patch ----------
    const patchCanvas = document.createElement("canvas");
    patchCanvas.width = 256;
    patchCanvas.height = 256;
    const pcx = patchCanvas.getContext("2d")!;
    pcx.fillStyle = "#050505";
    pcx.fillRect(0, 0, 256, 256);
    const g = pcx.createLinearGradient(0, 110, 0, 150);
    g.addColorStop(0, "#ffe082");
    g.addColorStop(1, "#b8860b");
    pcx.fillStyle = g;
    pcx.font = "900 32px 'Helvetica Neue', Arial, sans-serif";
    pcx.textAlign = "center";
    pcx.textBaseline = "middle";
    pcx.fillText("KVRON", 128, 128);
    pcx.strokeStyle = "rgba(255,193,7,0.5)";
    pcx.lineWidth = 1.5;
    pcx.strokeRect(60, 100, 136, 56);
    const patchTex = new THREE.CanvasTexture(patchCanvas);
    patchTex.colorSpace = THREE.SRGBColorSpace;

    // ---------- Materials ----------
    const jacketMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0a,
      roughness: 0.55,
      metalness: 0.05,
      sheen: 1,
      sheenColor: new THREE.Color(0x2a2a2a),
      sheenRoughness: 0.4,
      clearcoat: 0.25,
      clearcoatRoughness: 0.5,
    });
    const cargoMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0d0d,
      roughness: 0.85,
      metalness: 0,
      sheen: 0.5,
      sheenColor: new THREE.Color(0x1a1a1a),
    });
    const sneakerMat = new THREE.MeshPhysicalMaterial({
      color: 0x070707,
      roughness: 0.3,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.25,
    });
    const soleMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.6,
    });
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      roughness: 0.5,
      metalness: 0.2,
      clearcoat: 0.3,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffc107,
      metalness: 1,
      roughness: 0.22,
      emissive: 0xffc107,
      emissiveIntensity: 0.35,
    });
    const chestPatchMat = new THREE.MeshStandardMaterial({
      map: patchTex,
      roughness: 0.45,
      metalness: 0.1,
    });

    // ---------- Mannequin ----------
    const mannequin = new THREE.Group();
    scene.add(mannequin);

    const add = (mesh: THREE.Mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mannequin.add(mesh);
      return mesh;
    };

    // Head
    const head = add(
      new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 32), skinMat)
    );
    head.position.set(0, 2.42, 0);
    head.scale.set(0.95, 1.1, 0.95);

    // Neck
    const neck = add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.28, 24), skinMat)
    );
    neck.position.set(0, 2.05, 0);

    // Bomber jacket — oversized boxy torso
    const torsoGeo = new THREE.BoxGeometry(1.55, 1.6, 0.85, 8, 8, 4);
    // soften corners by displacing slightly
    {
      const pos = torsoGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        const r = v.length();
        v.normalize().multiplyScalar(r + Math.sin(v.y * 3) * 0.02);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      torsoGeo.computeVertexNormals();
    }
    const torso = add(new THREE.Mesh(torsoGeo, jacketMat));
    torso.position.set(0, 1.18, 0);

    // Jacket bottom ribbing (gold band — subtle)
    const ribbing = add(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.82, 0.82, 0.12, 32, 1, true),
        jacketMat
      )
    );
    ribbing.position.set(0, 0.42, 0);
    ribbing.scale.z = 0.55;
    const goldHem = add(
      new THREE.Mesh(
        new THREE.TorusGeometry(0.82, 0.008, 8, 64),
        goldMat
      )
    );
    goldHem.position.set(0, 0.38, 0);
    goldHem.rotation.x = Math.PI / 2;
    goldHem.scale.z = 0.55;

    // Collar
    const collar = add(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.34, 0.18, 32, 1, true),
        jacketMat
      )
    );
    collar.position.set(0, 1.95, 0);

    // Front zipper line (thin gold)
    const zip = add(
      new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 1.5, 0.02),
        goldMat
      )
    );
    zip.position.set(0, 1.18, 0.43);

    // KVRON chest patch
    const patch = add(
      new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.2), chestPatchMat)
    );
    patch.position.set(-0.42, 1.55, 0.435);

    // Arms — oversized sleeves
    const makeArm = (side: 1 | -1) => {
      const arm = new THREE.Group();
      const upper = new THREE.Mesh(
        new THREE.CylinderGeometry(0.27, 0.3, 1.0, 20),
        jacketMat
      );
      upper.castShadow = true;
      upper.position.set(0, -0.5, 0);
      arm.add(upper);
      const lower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.26, 0.24, 0.95, 20),
        jacketMat
      );
      lower.castShadow = true;
      lower.position.set(0, -1.42, 0);
      arm.add(lower);
      // Cuff ribbing
      const cuff = new THREE.Mesh(
        new THREE.TorusGeometry(0.245, 0.018, 8, 32),
        goldMat
      );
      cuff.position.set(0, -1.88, 0);
      cuff.rotation.x = Math.PI / 2;
      arm.add(cuff);
      // Hand
      const hand = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 20, 20),
        skinMat
      );
      hand.castShadow = true;
      hand.position.set(0, -2.05, 0);
      hand.scale.set(0.9, 1.2, 1.1);
      arm.add(hand);

      arm.position.set(side * 0.95, 1.7, 0);
      arm.rotation.z = side * 0.08;
      mannequin.add(arm);
    };
    makeArm(1);
    makeArm(-1);

    // Cargo pants — wide tapered legs
    const makeLeg = (side: 1 | -1) => {
      const leg = new THREE.Group();
      // upper thigh — wide
      const thighGeo = new THREE.CylinderGeometry(0.35, 0.42, 1.1, 20);
      const thigh = new THREE.Mesh(thighGeo, cargoMat);
      thigh.castShadow = true;
      thigh.position.set(0, -0.55, 0);
      leg.add(thigh);
      // shin — slightly tapered but still wide (baggy)
      const shin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.4, 1.25, 20),
        cargoMat
      );
      shin.castShadow = true;
      shin.position.set(0, -1.7, 0);
      leg.add(shin);
      // cargo pocket
      const pocket = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.32, 0.1),
        cargoMat
      );
      pocket.castShadow = true;
      pocket.position.set(side * 0.35, -1.5, 0.05);
      leg.add(pocket);
      const pocketTrim = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.01, 0.11),
        goldMat
      );
      pocketTrim.position.set(side * 0.35, -1.35, 0.06);
      leg.add(pocketTrim);

      leg.position.set(side * 0.45, 0.4, 0);
      mannequin.add(leg);
    };
    makeLeg(1);
    makeLeg(-1);

    // Sneakers — chunky luxury silhouette
    const makeSneaker = (side: 1 | -1) => {
      const shoe = new THREE.Group();
      const upper = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.36, 1.0, 8, 4, 8),
        sneakerMat
      );
      // round it
      {
        const pos = upper.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
          const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
          const r = v.length();
          v.normalize().multiplyScalar(r + Math.sin(v.z * 2) * 0.03);
          pos.setXYZ(i, v.x, v.y, v.z);
        }
        upper.geometry.computeVertexNormals();
      }
      upper.castShadow = true;
      upper.position.y = 0.22;
      shoe.add(upper);
      // chunky sole
      const sole = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.18, 1.08),
        soleMat
      );
      sole.castShadow = true;
      sole.position.y = 0.0;
      shoe.add(sole);
      // gold lace tip
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        goldMat
      );
      tip.position.set(0, 0.32, 0.15);
      shoe.add(tip);

      shoe.position.set(side * 0.45, -3.0, 0.15);
      mannequin.add(shoe);
    };
    makeSneaker(1);
    makeSneaker(-1);

    // Scale to occupy roughly 40% of viewport width via camera framing.
    mannequin.position.y = 0.0;

    // ---------- Particles ----------
    const pGeo = new THREE.BufferGeometry();
    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 9;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xffc107,
        size: 0.012,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
    );
    scene.add(particles);

    // ---------- Entrance + interaction ----------
    mannequin.scale.setScalar(0.7);
    mannequin.position.y = -0.8;
    const start = performance.now();
    const dur = 1500;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = () => {
      const t = clock.getElapsedTime();
      const ep = Math.min(1, (performance.now() - start) / dur);
      const e = easeOutExpo(ep);
      const sc = 0.7 + 0.3 * e;
      mannequin.scale.setScalar(sc);

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      mannequin.position.y = -0.8 + 0.8 * e + Math.sin(t * 0.9) * 0.06;
      mannequin.rotation.y = -0.3 + t * 0.18 + mouse.x * 0.35;
      mannequin.rotation.x = mouse.y * 0.06;

      particles.rotation.y = t * 0.02;
      particles.position.y = Math.sin(t * 0.4) * 0.1;

      camera.position.x = mouse.x * 0.3;
      camera.position.y = 0.4 + -mouse.y * 0.2;
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) mat.dispose();
      });
      patchTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
