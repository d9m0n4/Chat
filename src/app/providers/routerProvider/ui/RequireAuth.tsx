import React, {FC, PropsWithChildren} from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {
    const auth = false
    return auth ? (
        children
    ) : (
        <Navigate to="/auth"/>
    );
};