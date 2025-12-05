import "./globals.css";
import Navbar from "../components/Navbar";
import { UserProvider } from "../context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
