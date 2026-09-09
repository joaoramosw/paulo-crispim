/**
 * Normaliza um telefone brasileiro para E.164 (+55DDDNUMERO), formato exigido
 * pelo Enhanced Conversions do Google Ads. Retorna undefined para entradas
 * vazias ou com quantidade de dígitos incompatível com um número BR válido,
 * em vez de arriscar enviar um valor malformado ao Google.
 */
export function normalizePhoneToE164BR(rawPhone: string | undefined | null): string | undefined {
  if (!rawPhone) return undefined;

  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) return undefined;

  const withCountryCode = digits.startsWith("55") ? digits : `55${digits}`;

  // 55 (DDI) + DD (DDD) + 8 ou 9 dígitos de número = 12 ou 13 dígitos.
  if (withCountryCode.length < 12 || withCountryCode.length > 13) {
    return undefined;
  }

  return `+${withCountryCode}`;
}
