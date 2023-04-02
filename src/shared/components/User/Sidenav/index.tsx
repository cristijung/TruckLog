import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { SidenavContainer, SidenavContent } from "./styles";

interface ISidenavProps {
    children: React.ReactNode;
}

export const Sidenav = ({ children }: ISidenavProps) => {
    const sidenav = useRef<HTMLElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [currentLink, setCurrentLink] = useState("dashboard");

    const handleToggleSidenav = () => {
        if (sidenav.current && container.current) {
            sidenav.current.classList.toggle("expanded");
            container.current.classList.toggle("expanded");
        }
    };

    useEffect(() => {
        if (sidenav.current && container.current) {
            if (window.innerWidth <= 750) {
                sidenav.current.classList.remove("expanded");
                container.current.classList.add("expanded");
            }
        }

        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;

            // MODO MOBILE
            if (sidenav.current && container.current) {
                if (newWidth <= 750) {
                    sidenav.current.classList.remove("expanded");
                    container.current.classList.add("expanded");
                }
            }
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () =>
            window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    return (
        <SidenavContainer>
            <Header handleOpenSidenav={handleToggleSidenav} />
            <div className="container" ref={container}>
                <SidenavContent className="expanded" ref={sidenav}>
                    <h3 className="category">GERENCIAMENTO</h3>

                    <Link
                        to={"/usuario/dashboard"}
                        className={`item ${
                            currentLink === "dashboard" ? "active" : ""
                        }`}
                        onClick={() => setCurrentLink("dashboard")}
                    >
                        <i className="ph-fill ph-house"></i> Dashboard
                    </Link>

                    <Link
                        to={"/usuario/viagens"}
                        className={`item ${
                            currentLink === "viagens" ? "active" : ""
                        }`}
                        onClick={() => setCurrentLink("viagens")}
                    >
                        <i className="ph ph-path"></i> Viagens
                    </Link>
                    <Link
                        to={"/usuario/motoristas"}
                        className={`item ${
                            currentLink === "motoristas" ? "active" : ""
                        }`}
                        onClick={() => setCurrentLink("motoristas")}
                    >
                        <i className="ph ph-user"></i> Motoristas
                    </Link>
                    <Link
                        to={"/usuario/rotas"}
                        className={`item ${
                            currentLink === "rotas" ? "active" : ""
                        }`}
                        onClick={() => setCurrentLink("rotas")}
                    >
                        <i className="ph ph-signpost"></i> Rotas
                    </Link>
                    <Link
                        to={"/usuario/caminhoes"}
                        className={`item ${
                            currentLink === "caminhoes" ? "active" : ""
                        }`}
                        onClick={() => setCurrentLink("caminhoes")}
                    >
                        <i className="ph ph-truck"></i> Caminhões
                    </Link>
                    <Link
                        to={"/usuario/postos"}
                        className={`item ${
                            currentLink === "postos" ? "active" : ""
                        }`}
                        onClick={() => setCurrentLink("postos")}
                    >
                        <i className="ph ph-gas-pump"></i> Postos
                    </Link>
                </SidenavContent>
                {children}
            </div>
        </SidenavContainer>
    );
};
