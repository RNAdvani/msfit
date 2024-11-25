
import React from 'react'
import { BagData } from '../types'
import SwatchWrapper from './swatch-wrapper'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'



type CanvasProps = {activeData:BagData,handleSwatchClick:(item: BagData) => void,swatchData: BagData[]}


class Canvas extends React.Component<CanvasProps,any>{
    container: HTMLElement | null = null;
    sizes  = {
        width: 0,
        height: 0
    }
    canvas : HTMLCanvasElement | null = null;
    scene: THREE.Scene | null = null;
    camera: THREE.PerspectiveCamera | null = null;
    manager: THREE.LoadingManager | null = null;
    controls: OrbitControls | null = null;
    renderer: THREE.WebGLRenderer | null = null;

    constructor(props:CanvasProps){
        super(props)
        
    }

    componentDidMount(): void {
        this.InitialSetup()
    }

    componentDidUpdate(prevProps: Readonly<CanvasProps>): void {
        const {activeData} = this.props;
        if(prevProps.activeData.id !== activeData.id){
            this.applyMaterial(activeData)
        }
    }

    applyMaterial = (data:BagData)=>{
      this.scene?.traverse((child) => {
        if(child instanceof THREE.Mesh){
            Object.keys(data.itemList).forEach((mesh) =>{
              console.log(mesh[1])
              if(mesh === child.name){
                var value = new THREE.Color(data.itemList[mesh].color).convertSRGBToLinear();
                gsap.to(child.material.color,{
                  r: value.r,
                  g: value.g,
                  b: value.b,
                  ease: 'power3.inOut',
                  duration: 0.8,
                })
                child.material.needsUpdate = true;
              }
            })
        }
      })
    }

    InitialSetup = () =>{
      this.container = document.getElementById('container');
      const item = this.container?.getBoundingClientRect();
      this.sizes = {
          width: item?.width || 0,
          height: item?.height || 0
      }

      this.canvas  = document.querySelector('.webgl') as HTMLCanvasElement;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 10, 5000);
      this.camera.position.set(150, 20, 100);
      this.scene.add(this.camera);

      this.manager = new THREE.LoadingManager();

      this.manager.onProgress = (_,itemsLoaded,itemsTotal) =>{
        const ProgressVal = (itemsLoaded/itemsTotal) * 100;
        if(ProgressVal === 100){
            console.log('All items loaded')
        }
      }

      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.touches = {
        ONE : THREE.TOUCH.ROTATE,
        TWO : THREE.TOUCH.DOLLY_PAN
      }

      this.controls.enableDamping = true;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 2;
      this.controls.enablePan = false;
      this.controls.enableZoom = false;
      this.controls.maxPolarAngle = Math.PI/1.9;
      this.controls.minPolarAngle = -Math.PI/2;
      this.controls.minDistance = 100;
      this.controls.maxDistance = 300;

      this.renderer  = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true
      });

      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;

      this.addModel();
      this.loadHDR(); 
      window.addEventListener('resize',this.resize);

      const render = () =>{
          this.controls?.update();
          this.renderer?.render(this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera);
          window.requestAnimationFrame(render);
      }
      render()
    }

    loadHDR = () =>{
      new RGBELoader(this.manager!).setDataType(THREE.HalfFloatType).load("default.hdr",(texture)=>{
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          texture.mapping  = THREE.EquirectangularReflectionMapping;
          texture.needsUpdate = true;
          const scene = this.scene as THREE.Scene;
          scene.environment = texture as THREE.Texture;
      })
    }

    addModel = () =>{
      const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.0`; 
      const DRACO_LOADER = new DRACOLoader(this.manager!).setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`);

      const bag  = `bag.glb`;

      const GLTF_LOADER = new GLTFLoader(this.manager!).setDRACOLoader(DRACO_LOADER);

      GLTF_LOADER.load(bag, (gltf) => {

        gltf.scene.position.set(0,-30,0);

        //If there are many child meshes in the model
        
        // gltf.scene.traverse((child) => {
        //   if(child instanceof THREE.Mesh){
        //     child.castShadow = true;
        //     child.receiveShadow = true;
        //     const material = child.material as THREE.MeshStandardMaterial;
        //     material.needsUpdate = true;
        //   }
        // })

        this.scene?.add(gltf.scene);
      });
    }

    resize = () =>{
      this.sizes.width = this.container?.offsetWidth || 0;
      this.sizes.height = this.container?.offsetHeight || 0;
      this.renderer?.setSize(this.sizes.width, this.sizes.height);
      const camera = this.camera as THREE.PerspectiveCamera;
      camera.aspect = this.sizes.width / this.sizes.height;
      camera.updateProjectionMatrix();
    } 

    render(){
        const {activeData,handleSwatchClick,swatchData} = this.props
        return <div id='container' className='w-full max-lg:h-3/5 relative z-[10] lg:w-1/2 lg:h-screen'>

          <canvas className='webgl w-full h-full relative z-10'></canvas>

          <SwatchWrapper activeData={activeData} handleSwatchClick= {handleSwatchClick} swatchData={swatchData}  />
        </div>
    }
}

export default Canvas