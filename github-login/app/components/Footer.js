export default function Footer() {
  const links = [
    "Terms",
    "Privacy",
    "Docs",
    "Contact GitHub Support",
    "Manage cookies",
    "Do not share my personal information",
  ];

  return (
    <footer className="page-footer">
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
