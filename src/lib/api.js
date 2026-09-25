const REQUEST_TIMEOUT_MS = 45_000;
const localHostnames = ['localhost', '127.0.0.1'];
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '');
const API_BASE_URL =
  configuredApiBaseUrl ||
  (localHostnames.includes(window.location.hostname) ? 'http://localhost:3001' : '');

export async function generateQuiz(input, questionCount, difficulty) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, questionCount, difficulty }),
      signal: controller.signal,
    });

    let payload;
    try {
      payload = await response.json();
    } catch {
      throw new Error('invalid-json');
    }

    if (!response.ok) {
      const error = new Error(payload?.error || 'server-error');
      error.code = payload?.code || 'server-error';
      error.status = response.status;
      throw error;
    }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new Error('empty-response');
    }
    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error('timeout');
      timeoutError.code = 'timeout';
      throw timeoutError;
    }
    if (error instanceof TypeError) {
      const networkError = new Error('network-error');
      networkError.code = 'network-error';
      throw networkError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
