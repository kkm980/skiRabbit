"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loader from "../common/Loader";

export function ThemeSetter() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loader />; // Avoid hydration mismatch by not rendering on the server
    }

    return (
        <>
            {theme === "dark" ? (
                <Button
                    className="bg-transparent hover:bg-transparent"
                    variant="ghost"
                    onClick={() => {
                        setTheme("light");
                    }}
                >
                    <Image src="/images/home/dark.gif" width={32} height={32} alt="dark" className="transition-all duration-2000 ease-in-out" />
                    {/* <Moon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
                </Button>
            ) : (
                <Button
                    className="bg-transparent hover:bg-transparent"
                    variant="ghost"
                    onClick={() => {
                        setTheme("dark");
                    }}
                >
                     <Image src="/images/home/day.gif" width={32} height={32} alt="dark" className="transition-all duration-2000 ease-in-out" />
                    {/* <Sun className="transition-all dark:-rotate-90 dark:scale-0" /> */}
                </Button>
            )}
        </>
    );
}
