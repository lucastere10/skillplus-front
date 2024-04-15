"use client"
import React, { FC, useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

interface EnableTwoFa {
    id:string
}

export function EnableTwoFa(id:string, value:boolean) {
    const [isEnabled, setEnabled] = useState(value)

    useEffect(() => {
        if (resolvedTheme) {
            localStorage.setItem('theme', resolvedTheme)
        }
    }, [resolvedTheme])

    const toggleTheme = () => {
        if (isEnabled) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
        setEnabled(!isEnabled)
    }

    return (
        <Switch id={id} onClick={toggleTheme}>{isEnabled ? 'On' : 'Off'}</Switch>
    )
}
