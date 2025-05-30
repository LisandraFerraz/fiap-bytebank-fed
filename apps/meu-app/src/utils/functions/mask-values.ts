import { useMask } from "@react-input/mask";

export function formatCpf(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})?/, "$1.$2.$3-$4")
    .slice(0, 14);
}
