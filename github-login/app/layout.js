import "./globals.css";

export const metadata = {
  title: "Sign in to GitHub · GitHub",
  description:
    "GitHub is where over 100 million developers shape the future of software, together.",
  icons: {
    icon: "https://github.githubassets.com/favicons/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
