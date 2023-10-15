import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function formatDate(isoDate) {
  const zonedDate = utcToZonedTime(isoDate, "America/Sao_Paulo");
  const output = format(zonedDate, "dd/MM/yyyy - HH:mm:ss");

  return output;
}

export function calculateCapacityTest(currentLevel, height, length, width) {
  try {
    const minSensorLevel = 20; // sensor não lê abaixo disso, considerar aquário cheio

    // Se o nível do líquido for menor que o mínimo, considerar aquário 100% cheio
    if (currentLevel < minSensorLevel) {
      return 100;
    }

    // Se o nível do líquido for igual ou maior que a altura do aquário, considerar aquário 0% cheio
    if (currentLevel >= height) {
      return 0;
    }

    // Calcular o nível atual do líquido em relação à altura do aquário
    const actualWaterLevel = height - currentLevel;

    // Calcular o volume total do aquário
    const totalVolume = length * width * height;

    // Calcular o volume do líquido com base no nível atual
    const currentVolume = length * width * actualWaterLevel;

    // Calcular a porcentagem da capacidade atual
    let capacity = (currentVolume / totalVolume) * 100;

    // Arredondar para 2 casas decimais e garantir que a capacidade não exceda 100%
    return Math.round(capacity * 100) / 100;
  } catch (error) {
    console.error(error);
    return "Indisponível";
  }
}

export function calculateCapacity(currentLevel, height, radius) {
  try {
    const minSensorLevel = 20; // sensor não lê abaixo disso, considerar aquário cheio

    // Se o nível do líquido for menor que o mínimo, considerar aquário 100% cheio
    if (currentLevel < minSensorLevel) {
      return 100;
    }

    // Se o nível do líquido for igual ou maior que a altura do aquário, considerar aquário 0% cheio
    if (currentLevel >= height) {
      return 0;
    }

    // Calcular o nível atual do líquido em relação à altura do aquário
    const actualWaterLevel = height - currentLevel;

    // Calcular o volume total do aquário
    const totalVolume = Math.PI * Math.pow(radius, 2) * height;

    // Calcular o volume do líquido com base no nível atual
    const currentVolume = Math.PI * Math.pow(radius, 2) * actualWaterLevel;

    // Calcular a porcentagem da capacidade atual
    let capacity = (currentVolume / totalVolume) * 100;

    // Arredondar para 2 casas decimais e garantir que a capacidade não exceda 100%
    return Math.round(capacity * 100) / 100;
  } catch (error) {
    console.error(error);
    return "Indisponível";
  }
}
