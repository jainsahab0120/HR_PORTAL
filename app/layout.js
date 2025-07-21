import Header from "./Components/Header";
import "./globals.css";
import { UserProvider } from './context/UserContext';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header/>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
