import Link from "next/link";

type PolicyPageProps = {
  title: string;
  description: string;
  updated: string;
  sections: ReadonlyArray<{
    title: string;
    body: readonly string[];
  }>;
};

export function PolicyPage({ title, description, updated, sections }: PolicyPageProps) {
  return (
    <div className="policy-shell">
      <header className="policy-header">
        <Link className="brand" href="/" aria-label="PawFriend home">
          <svg aria-hidden="true" viewBox="0 0 32 32">
            <ellipse cx="16" cy="21" rx="7" ry="6" fill="currentColor" />
            <circle cx="8" cy="13" r="3" fill="currentColor" />
            <circle cx="14" cy="8" r="3" fill="currentColor" />
            <circle cx="22" cy="10" r="3" fill="currentColor" />
            <circle cx="25" cy="17" r="2.5" fill="currentColor" />
          </svg>
          PawFriend
        </Link>
        <Link href="/">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M19 12H5m6-6-6 6 6 6" />
          </svg>
          Back to the pets
        </Link>
      </header>
      <main className="policy-main">
        <div className="policy-title">
          <h1>{title}</h1>
          <p>{description}</p>
          <small>Last updated {updated}</small>
        </div>
        <div className="policy-sections">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </main>
      <footer className="policy-footer">
        <p>Clear care starts with clear information.</p>
        <Link href="/">Return to PawFriend</Link>
      </footer>
    </div>
  );
}
