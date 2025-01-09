import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex w-full h-screen">
      <div 
        className="w-1/2 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/auth-bg.jpg')" }}
      />
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <Outlet />
      </div>
    </div>
  );
}