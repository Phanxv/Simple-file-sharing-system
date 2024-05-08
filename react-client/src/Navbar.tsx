import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="topnav">
      <IsActiveLink to="/">Home</IsActiveLink>
      <IsActiveLink to="/login">Log in</IsActiveLink>
      <IsActiveLink to="/register">Register</IsActiveLink>
      <IsActiveLink to="/upload">Upload</IsActiveLink>
    </nav>
  );
};

interface isActiveProps {
  to: string;
  children: ReactNode;
}

function IsActiveLink({ to, children }: isActiveProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
        <Link className={ isActive ? "active" : "" } to={to}>
          {children}
        </Link>
  );
}

export default Navbar;
