import { Write } from "../utils/dbInterfaces";
import { getApi } from "../utils/sdk";
import getWrites from "../utils/getWrites";

const chain = "ethereum";
const token = "0x9a1bFb2B9E3d1959Ed11636bc56DB0aB7b4473A9";
const oracle = "0xE41cD2DcC63EB63A9D9e62f2a3D9b49e6d0C0A1d";

export async function SurARSs(timestamp: number = 0): Promise<Write[]> {
  const api = await getApi(chain, timestamp);
  const latestAnswer = await api.call({
    target: oracle,
    abi: "int256:latestAnswer",
  });
  const price = Number(latestAnswer) / 1e8;

  const pricesObject = {
    [token]: {
      price,
      symbol: "ARSs",
      decimals: 18,
    },
  };

  return getWrites({
    chain,
    timestamp,
    pricesObject,
    projectName: "SurARSs",
    confidence: 0.9,
  });
}
