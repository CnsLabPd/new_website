// app/(custom)/layout.tsx
export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/*leave this blank or add a very minimal 'Back to Home' nav here */}
      <main>{children}</main>
      {/* No Footer or WorkshopBanner here unless you explicitly add them */}
    </div>
  )
}