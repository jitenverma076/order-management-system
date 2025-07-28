type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>

export function DashboardShell({
    children
}: DashboardShellProps) {
    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <div className="container grid items-start gap-10 py-8">
                {children}
            </div>
        </div>
    )
}
