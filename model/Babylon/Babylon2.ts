import * as BABYLON from "@babylonjs/core";
export default class BabylonJs {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  plane: any;
  dynamicTexture: any;
  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = this.CreateScene();
    this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
    this.AddPlane();
  }
  CreateScene(): BABYLON.Scene {
    const scene = new BABYLON.Scene(this.engine);
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      1,
      1,
      15,
      BABYLON.Vector3.Zero(),
      scene
    );
    //   camera.onViewMatrixChangedObservable.add(function() {
    //     console.log("Camera position changed:", camera.position);
    // });
    camera.position = new BABYLON.Vector3(-1.2, -0.3, -15);
    camera.attachControl();
    // camera.speed = 1;
    const hemLight = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 0.5, 0),
      scene
    );
    hemLight.intensity = 2;
    return scene;
  }
  AddTextureDefaule() {
    var texture = new BABYLON.Texture(
      "/mask/font.png",
      this.scene,
      true,
      false,
      BABYLON.Texture.NEAREST_SAMPLINGMODE,
      null,
      null,
      null,
      true
    );
    this.plane.material = new BABYLON.StandardMaterial("mat", this.scene);
    this.plane.material.diffuseTexture = texture;
    // this.plane.material.diffuseTexture.flipU = -1;
    // this.plane.material.diffuseTexture.flipV = 1;
    this.plane.material.diffuseTexture.hasAlpha = true;
    this.plane.material.useAlphaFromDiffuseTexture = true;
    this.plane.material.backFaceCulling = false;
  }
  AddDynamicTexture() {
    this.dynamicTexture = new BABYLON.DynamicTexture(
      "dynamic texture",
      1000,
      this.scene,
      true
    );
    var context = this.dynamicTexture.getContext();
    var image = new Image();

    // image.src = "/mask/font.png";
    image.onload = () => {
      context.drawImage(image, 0, 0, 1000, 1000);
      this.dynamicTexture.update();
    };
    this.plane.material = new BABYLON.StandardMaterial("material", this.scene);
    this.plane.material.diffuseTexture = this.dynamicTexture;
    this.plane.material.diffuseTexture.hasAlpha = true;
    this.plane.material.useAlphaFromDiffuseTexture = true;
    this.plane.material.backFaceCulling = false;
  }
  AddPlane() {
    this.plane = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { width: 5, height: 8 },
      this.scene
    );
    this.plane.position.z = -0.5
    this.plane.material = new BABYLON.StandardMaterial("mat", this.scene);
    this.AddDynamicTexture();
    this.AddTextureDefaule()
    this.AddPoint();
  }
  ChangeTexture(txt: string) {
    var image = new Image();
    image.src = txt;
    image.onload = () => {
      var context = this.dynamicTexture.getContext();
      context.clearRect(0, 0, 1000, 1000);
      context.drawImage(image, 0, 0, 1000, 1000);
    };
    this.dynamicTexture.update();
    this.plane.material.diffuseTexture = this.dynamicTexture;
    this.plane.material.diffuseTexture.hasAlpha = true;
    this.plane.material.useAlphaFromDiffuseTexture = true;
    this.plane.material.backFaceCulling = false;
    //======
  }
  AddPoint() {
    this.plane.increaseVertices(6);
    var positions = this.plane.getVerticesData(
      BABYLON.VertexBuffer.PositionKind
    );
    for (let p = 0; p < positions.length / 3; p++) {
      var pointerDragBehavior = new BABYLON.PointerDragBehavior({
        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0),
      });

      pointerDragBehavior.dragDeltaRatio = 1;

      // Listen to drag events
      pointerDragBehavior.onDragStartObservable.add((event) => {});
      pointerDragBehavior.onDragObservable.add((event) => {
        positions[p * 3] = event.dragPlanePoint.x;
        positions[p * 3 + 1] = event.dragPlanePoint.y;
        positions[p * 3 + 2] = event.dragPlanePoint.z;

        this.plane.setVerticesData(
          BABYLON.VertexBuffer.PositionKind,
          positions
        );
      });
      pointerDragBehavior.onDragEndObservable.add((event) => {});

      let node = BABYLON.MeshBuilder.CreateSphere(
        "NODE",
        { diameter: 0.2 },
        this.scene
      ); //scene is
      var x = positions[p * 3];
      var y = positions[p * 3 + 1];
      var z = positions[p * 3 + 2] -0.5;

      node.position = new BABYLON.Vector3(x, y, z);
      node.addBehavior(pointerDragBehavior);
    }
  }
  LoadModel(listModel: Array<string>) {
    listModel.forEach((link_image: string) => {
      if (link_image != "DAYNAMICTEXTURE") {
        const plane = BABYLON.MeshBuilder.CreatePlane(
          "plane",
          { width: 14, height: 14 },
          this.scene
        );
        plane.material = new BABYLON.StandardMaterial(link_image, this.scene);
        var texture = new BABYLON.Texture(link_image, this.scene);
        plane.material.diffuseTexture = texture;
        plane.material.diffuseTexture.hasAlpha = true;
        plane.material.useAlphaFromDiffuseTexture = true;
        plane.material.backFaceCulling = false;
      }
    });
  }
}
