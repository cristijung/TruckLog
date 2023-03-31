import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../Header";
import { SidenavContainer, SidenavContent } from "./styles";

interface ISidenavProps {
  children: React.ReactNode;
}

export const Sidenav = ({ children }: ISidenavProps) => {
  const sidenav = useRef<HTMLElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState("");

  const handleToggleSidenav = () => {
    if (sidenav.current && container.current) {
      sidenav.current.classList.toggle("expanded");
      container.current.classList.toggle("expanded");
    }
  };

  return (
    <SidenavContainer>
      <Header handleOpenSidenav={handleToggleSidenav} />
      <div className="container" ref={container}>
        <SidenavContent className="expanded" ref={sidenav}>
          <h3 className="category">GERENCIAMENTO</h3>

          <Link
            to={"/usuario/dashboard"}
            className={`item ${
              location.pathname === "/usuario/dashboard" ? "active" : ""
            }`}
          >
            <i className="ph-fill ph-house"></i> Dashboard
          </Link>

          <Link
            to={"/usuario/viagens"}
            className={`item ${
              location.pathname === "/usuario/viagens" ? "active" : ""
            }`}
          >
            <i className="ph ph-path"></i> Viagens
          </Link>
          <Link
            to={"/usuario/efetivo"}
            className={`item ${
              location.pathname === "/usuario/efetivo" ? "active" : ""
            }`}
          >
            <i className="ph ph-user"></i> Motoristas
          </Link>
          <Link
            to={"/usuario/rotas"}
            className={`item ${
              location.pathname === "/usuario/rotas" ? "active" : ""
            }`}
          >
            <i className="ph ph-signpost"></i> Rotas
          </Link>
          <Link
            to={"/usuario/caminhoes"}
            className={`item ${
              location.pathname === "/usuario/caminhoes" ? "active" : ""
            }`}
          >
            <i className="ph ph-truck"></i> Caminhões
          </Link>
          <Link
            to={"/usuario/postos"}
            className={`item ${
              location.pathname === "/usuario/postos" ? "active" : ""
            }`}
          >
            <i className="ph ph-gas-pump"></i> Postos
          </Link>
        </SidenavContent>
        {children}
      </div>
    </SidenavContainer>
  );
};
