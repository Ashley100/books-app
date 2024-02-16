import { Outlet } from "@tanstack/react-router";

export function LibraryLayout() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
