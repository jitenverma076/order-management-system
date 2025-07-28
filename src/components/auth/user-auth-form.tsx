"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: 'signin' | 'signup'
    onToggleMode?: () => void
}

export function UserAuthForm({
    mode = 'signin',
    onToggleMode,
    className,
    ...props
}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.target as HTMLFormElement)

            if (mode === 'signup') {
                // For development, just simulate signup success
                toast({
                    title: "Account created",
                    description: "Please sign in with your new account.",
                })
                if (onToggleMode) onToggleMode()
            } else {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: formData.get("email"),
                    password: formData.get("password"),
                })

                if (result?.error) {
                    throw new Error(result.error)
                }

                toast({
                    title: "Success",
                    description: "Welcome back!",
                })
                router.push("/dashboard")
            }
        } catch {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    {mode === 'signup' && (
                        <div className="grid gap-1">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="name"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    )}
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {mode === 'signup' ? 'Create Account' : 'Sign In'}
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google")}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
        </div>
    )
}
