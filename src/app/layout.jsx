import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Vidyut 2025",
  description: "Multifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      > 
        <NavBar />
        {children}
      </body>
    </html>
  );
}
