declare module "threebox-plugin" {
  type LoadObjOptions = {
    // https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#loadobj
    obj: string;
    type: "mtl" | "gltf" | "fbx" | "dae";
    scale: number | { x: number; y: number; z: number };
    units: "scene" | "meters";
    rotation: number | { x: number; y: number; z: number };
  };
  type ThreeboxOptions = {
    defaultLights?: boolean;
  };
  type Model = {
    setCoords: Fn;
    setRotation: Fn;
  };
  class ThreeboxInstance {
    loadObj: (options: LoadObjOptions, cb: (model: Model) => void) => void;
    add: (model: Model) => void;
    update: () => void;
    dispose: () => void;
  }
  class Threebox extends ThreeboxInstance {
    constructor(
      // https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#constructor
      map: MapInstance,
      context: WebGLRenderingContext | null,
      options: ThreeboxOptions,
    );
  }
}

interface Window {
  tb: ThreeboxInstance;
}
