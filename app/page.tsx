import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-blue-50 content-center p-16">
      <h1 className="text-6xl font-bold text-center">Dashboard under construction</h1>
      <br />
      <br />
      <p className="text-2xl text-center">🚧 This site is still under construction! But you can check <a href="/administrar" className="text-blue-600 underline">/admin</a> route for watching our advance! 🚧</p>
    </div>  
  );
}
