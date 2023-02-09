import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  SceneLoader,
  HemisphericLight,
  MeshBuilder,
  Color3,
  StandardMaterial,
  Texture,
  ArcRotateCamera,
  VertexBuffer,
  PointerDragBehavior,
  VertexData,
  Mesh,
  Color4
} from "@babylonjs/core";
import "@babylonjs/loaders";

export default class Babylon {
  scene: Scene;
  engine: Engine;
  ground: any;
  material: any;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.scene.clearColor = new Color4(1, 1, 1, 1);
    // =================================================================
    this.ground = MeshBuilder.CreateGround(
      "Font",
      { width: 8, height: 10 },
      this.scene
    );
    // this.ground.rotation.y = -Math.PI / 2;
    this.material = new StandardMaterial("material", this.scene);
  
    // =================================================================
    this.canvas = canvas;
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  /**
   * Create a new scene, and return it.
   * @returns A new instance of the Scene class.
   */
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new ArcRotateCamera(
      "Camera",
      0,
      0,
      15,
      Vector3.Zero(),
      scene
    );
    camera.attachControl();
    // camera.speed = 1;
    const hemLight = new HemisphericLight(
      "light1",
      new Vector3(1, 0.5, 0),
      scene
    );
    hemLight.intensity = 2;
    return scene;
  }

  loadTexture() {
    window.addEventListener("export-image", (event) => {
      var texture = new Texture(event.detail.image, this.scene);
      this.material.diffuseTexture = texture;
      this.material.diffuseTexture.hasAlpha = true;
      this.ground.material = this.material;
    });
  }
}

// --- căt được ảnh bên fabric rồi thay đổi position để phù hợp với model
