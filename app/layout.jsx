import "./globals.css";

export const metadata = {
  title: "SuiMesh",
  description:
    "SuiMesh is the communication protocol layer for AI Agents on Sui, built for auditable coordination, traceable execution, and onchain memory."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
