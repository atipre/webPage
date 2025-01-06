/// <reference types="vite/client" />
import { MeshProps, GroupProps } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: GroupProps;
      mesh: MeshProps;
      primitive: any;
    }
  }
}