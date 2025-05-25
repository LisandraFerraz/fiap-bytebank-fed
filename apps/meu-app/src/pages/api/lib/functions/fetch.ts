export async function getFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsed: T = await res.json();

    return parsed;
  } catch (error) {
    console.error(`Erro ao realizar chamada para ${url}.`);
    throw error;
  }
}
