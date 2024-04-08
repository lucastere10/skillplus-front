"use client"
import React, { FC, useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export const ThemeToggle: FC<unknown> = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [isToggled, setIsToggled] = useState(resolvedTheme === 'dark')

    useEffect(() => {
        if (resolvedTheme) {
            localStorage.setItem('theme', resolvedTheme)
        }
    }, [resolvedTheme])

    const toggleTheme = () => {
        if (isToggled) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
        setIsToggled(!isToggled)
    }

    return (
        <Switch onClick={toggleTheme}>{isToggled ? 'On' : 'Off'}</Switch>
    )
}
