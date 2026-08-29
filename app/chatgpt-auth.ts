import { headers } from 'next/headers';

export type ChatGPTUser = {
  id: string;
  email: string;
  name: string | null;
};

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const id = requestHeaders.get('oai-authenticated-user-id');
  const email = requestHeaders.get('oai-authenticated-user-email');

  if (!id || !email) return null;

  const encodedName = requestHeaders.get('oai-authenticated-user-full-name');
  const nameEncoding = requestHeaders.get('oai-authenticated-user-full-name-encoding');
  let name: string | null = null;

  if (encodedName && nameEncoding === 'percent-encoded-utf-8') {
    try {
      name = decodeURIComponent(encodedName);
    } catch {
      name = null;
    }
  }

  return { id, email, name };
}

export function chatGPTSignInPath(returnTo: string) {
  const safeReturnTo = returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/';
  return '/signin-with-chatgpt?return_to=' + encodeURIComponent(safeReturnTo);
}
