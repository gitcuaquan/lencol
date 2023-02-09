import {
  Scene,
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  PerspectiveCamera,
  AmbientLight,
  Color,
  WebGLRenderer,
  sRGBEncoding,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default class Three {
  camera: PerspectiveCamera;
  light: AmbientLight;
  scene: Scene;
  textureLoader: TextureLoader;
  renderer: WebGLRenderer;
  control: OrbitControls;
  constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, 1, 0.1, 1000);
    this.light = new AmbientLight(0xffffff, 1);
    this.scene.add(this.light);
    this.scene.add(this.camera);
    this.scene.background = new Color("#ffffff");
    // Tạo một hình hộp
    var geometry = new BoxGeometry(1, 1, 1);

    // Tạo một chất liệu kim loại
    var material = new MeshStandardMaterial({ color: 0x00ff00 });

    // Tạo mesh bằng hình hộp và chất liệu kim loại
    var mesh = new Mesh(geometry, material);

    // Thêm mesh vào scene của bạn
    this.scene.add(mesh);

    this.Renderer(canvas);
    const loop = () => {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loop);
    };
    loop();
  }
  Renderer(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.UpdateRenderer();
  }
  UpdateRenderer() {
    this.renderer.setSize(600, 800);
    this.renderer.render(this.scene, this.camera);
  }
  UpdateCamera() {
    this.camera.updateProjectionMatrix();
  }
}
