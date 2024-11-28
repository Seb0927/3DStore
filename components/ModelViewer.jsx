import { useGLTF } from "@react-three/drei";

const ModelViewer = ({ url }) => {
  const { scene } = useGLTF(url);

  return <primitive object={scene} scale={0.5} />;
};

export default ModelViewer;