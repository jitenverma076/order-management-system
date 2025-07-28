"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/auth/user-auth-form"

export default function AuthenticationPage() {
    const searchParams = useSearchParams()
    const [mode, setMode] = React.useState<'signin' | 'signup'>(
        searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
    )

    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Link href="/" className="flex items-center gap-2">
                            <Icons.logo className="h-6 w-6" />
                            OrderFlow
                        </Link>
                    </div>
                    <Button
                        variant="ghost"
                        className="absolute right-4 top-4 text-white hover:text-white/90"
                        asChild
                    >
                        <Link href="/">
                            <Icons.arrowRight className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This order management system has transformed the way we handle our business operations. It&apos;s efficient, intuitive, and exactly what we needed.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {mode === 'signup' ? 'Create an account' : 'Sign in to your account'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {mode === 'signup'
                                    ? 'Enter your details below to create your account'
                                    : 'Enter your email below to sign in to your account'
                                }
                            </p>
                        </div>
                        <UserAuthForm
                            mode={mode}
                            onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <button
                                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                                className="hover:text-brand underline underline-offset-4"
                            >
                                {mode === 'signin'
                                    ? "Don't have an account? Sign Up"
                                    : "Already have an account? Sign In"
                                }
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
