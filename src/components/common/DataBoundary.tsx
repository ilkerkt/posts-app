import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import DataFailed from "@/components/common/DataFailed";

interface DataBoundaryProps {
    isLoading: boolean;
    error: string | null;
    errorMessage?: string;
    children: React.ReactNode;
}

export default function DataBoundary({isLoading, error, errorMessage, children}: DataBoundaryProps) {
    if (isLoading) return <LoadingSpinner/>;
    if (error) return <DataFailed message={errorMessage || "Error occurred"}/>;
    return <>{children}</>;
}