export function Icon({ name = "arrow", size = 22 }: { name?: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    plane: <path d="m22 2-7 20-4-9-9-4 20-7ZM11 13l6-6" />,
    forms: <><path d="M14 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9Z" /><path d="M14 2v7h7M7 13h10M7 17h7" /></>,
    cloud: <><path d="M7 18a5 5 0 1 1 1-9 7 7 0 0 1 13 4 4 4 0 0 1-4 5Z" /><path d="m9 13 3 3 4-4" /></>,
    book: <><path d="M12 4v17M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z" /></>,
    chat: <><path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-5 2 2-5a9 9 0 1 1 16-5Z" /><path d="M8 11h8M8 7h5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 6 9 7 9-7" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-3 5-5 3 3-5 5-3Z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.arrow}</svg>;
}
