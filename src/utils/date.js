import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function formatDate(isoDate) {
  const zonedDate = utcToZonedTime(isoDate, "America/Sao_Paulo");
  const output = format(zonedDate, "dd/MM/yyyy - HH:mm:ss");

  return output;
}
