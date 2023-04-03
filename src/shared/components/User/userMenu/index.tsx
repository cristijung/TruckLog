import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DropDownContainer } from "./styles";
import { useGetLoggedUserQuery } from "../../../../redux/features/Authentication/authenticationSlice";

export function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { data: loggedUser } = useGetLoggedUserQuery();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <DropDownContainer>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "1.4rem",
                        width: "100%",
                    }}
                >
                    <i className="ph-fill ph-caret-down"></i>
                    {loggedUser?.nome}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem
                        onClick={() => handleLogout()}
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1.2rem",
                            width: "100%",
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </DropDownContainer>
        </div>
    );
}
