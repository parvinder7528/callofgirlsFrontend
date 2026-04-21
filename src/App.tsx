
// export { Route as AppRoute } from "./routes/__root";
// import "./App.css";

// export default function App() {
 
//   return null; 
// }


import { Outlet } from "@tanstack/react-router";

export default function App() {
  return <Outlet />;
}