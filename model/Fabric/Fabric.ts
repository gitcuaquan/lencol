import { fabric } from "fabric";

export class MyCustomEvent extends Event {
  detail: any;
  constructor(type: string, detail: any) {
    super(type);
    this.detail = detail;
  }
}
export default class Frabric {
  canvas: any;
  canvasExport: any;
  image: fabric.Image;
  clipPath: string;
  heightCanvas: number;
  widthCanvas: number;
  exportImage: string;
  urlImageOverlay: string;
  /**
   * This function sets the background color of the canvas to a transparent red color.
   * @param {HTMLCanvasElement} canvas - HTMLCanvasElement - The canvas element that you want to use.
   * @param {HTMLElement} container - The container that the canvas is in.
   */
  constructor(
    canvas: HTMLCanvasElement,
    container: HTMLElement,
    canvas2: HTMLCanvasElement
  ) {
    this.image = new fabric.Image("");
    this.clipPath = "";
    this.exportImage = "";
    this.urlImageOverlay = "";
    this.heightCanvas = 800;
    this.widthCanvas = 800;
    this.canvas = new fabric.Canvas(canvas, {
      isDrawingMode: false,
    });
    this.canvasExport = new fabric.StaticCanvas(canvas2);

    this.canvas.controlsAboveOverlay = true;
    this.canvas.setBackgroundColor(
      "#ecf0f1",
      this.canvas.renderAll.bind(this.canvas)
    );
    this.CustomFrabricJs();
    this.Resize(container);
    this.WatchCanvas();
  }
  WatchCanvas() {
    this.canvas.on("object:moving", (e: any) => {
      this.image.clone((img: any) => {
        this.canvasExport.remove(this.canvasExport.item(0));
        this.canvasExport.add(img);
        this.ExportImage();
      });
    });
    this.canvas.on("object:scaling", (e: any) => {
      this.image.clone((img: any) => {
        this.canvasExport.remove(this.canvasExport.item(0));
        this.canvasExport.add(img);
        this.ExportImage();
      });
    });
  }
  async ExportImage() {
    if (this.canvasExport) {
      this.exportImage = await this.canvasExport.toDataURL({
        format: "png",
        quality: 1,
        left: 280,
        top: 267,
        width: 240,
        height: 265,
      });
      window.dispatchEvent(
        new MyCustomEvent("export-image", { image: this.exportImage })
      );
    }
  }
  /**
   * "Khi cửa sổ được thay đổi kích thước, vải được thay đổi kích thước theo chiều rộng và chiều cao của container."
   * Hàm được gọi trong hàm tạo của
   * @param {HTMLElement} container - HTMLElement =&gt; the container element that the canvas will be
   * rendered in
   */
  Resize(container: HTMLElement) {
    const fnc = () => {
      this.canvas.setDimensions({
        width: this.widthCanvas,
        height: this.heightCanvas,
      });
      this.canvasExport.setDimensions({
        width: this.widthCanvas,
        height: this.heightCanvas,
      });
    };
    fnc();
    window.addEventListener("resize", fnc);
  }

  /**
   * "Load an image from a URL, resize it, and add it to the canvas."
   *
   * @param {string} url - the url of the image you want to load
   */
  LoadImageByUrl(url: string) {
    fabric.Image.fromURL(url, (image) => {
      var newOptions = this.ResizeImage(image);
      image.set({
        left: newOptions.left,
        top: newOptions.top,
      });
      image.scale(newOptions.scale);
      image.clone((img: any) => {
        this.canvasExport.add(img);
      });
      this.image = image;
      this.canvas.insertAt(image, 1);
      this.canvas.setActiveObject(image);
    });
  }
  LoadMask(url: string) {
    fabric.Image.fromURL(url, (image) => {
      image.set({
        left: 0,
        top: 0,
        selectable: false,
      });
      image.scale(Number(this.widthCanvas / Number(image.width)));
      image.clone((img: any) => {
        this.canvasExport.clipPath = img;
      });
      this.canvas.clipPath = image;
    });
  }
  /**
   * This function sets the default properties for all objects created in the canvas.
   */
  CustomFrabricJs() {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#e74c3c";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerSize = 10;
    fabric.Object.prototype.controls.mtr.offsetY = -50;
    fabric.Object.prototype.set({
      borderScaleFactor: 1,
    });
  }
  /**
   * It takes an image and returns an object with the image's width, height, left and top properties.
   * @param Image - fabric.Image
   * @returns An object with the properties width, height, left, and top.
   */
  ResizeImage(Image: fabric.Image) {
    var scale: number = 400 / Number(Image.width),
      left: number = 200,
      top: number = 100;
    // =====

    return {
      left,
      top,
      scale,
    };
  }
  /**

 * @param {string} url - string - The URL of the image to be used as the overlay.
 */
  SetOverlayImage(url: string) {
    this.urlImageOverlay = url;
    fabric.Image.fromURL(url, async (image: fabric.Image) => {
      await this.canvas.setOverlayImage(
        image,
        this.canvas.renderAll.bind(this.canvas),
        {
          scaleX: image.height ? this.canvas.height / image.height : 0,
          scaleY: image.height ? this.canvas.height / image.height : 0,
        }
      );
    });
  }
}
