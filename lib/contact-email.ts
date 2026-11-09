type ContactFields = { name: string; email: string; interest: string; message: string };

export function createContactDraft(fields: ContactFields) {
  const subject = `FPL4FLIGHT — ${fields.interest}`;
  const body = `Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}`;
  return { subject, body };
}

export function createContactEmail(recipient: string, fields: ContactFields) {
  const { subject, body } = createContactDraft(fields);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
