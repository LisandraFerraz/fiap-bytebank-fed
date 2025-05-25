export async function getFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const parsed: T = await res.json();

    /* Todos os gets desse BFF só usam o primeiro objeto.
    Por isso, a formatação padrão vai se manter assim: */
    // if (Array.isArray(parsed)) {
    //   return parsed[0];
    // }
    return parsed;
  } catch (error) {
    console.error(`Erro ao realizar chamada para ${url}.`);
    throw error;
  }
}
