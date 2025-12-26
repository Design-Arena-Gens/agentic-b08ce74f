import fs from "node:fs/promises";
import path from "node:path";
import { StrategyDashboard } from "@/components/StrategyDashboard";

async function loadExpertCode() {
  const file = path.join(process.cwd(), "public", "bot", "HFT_LiquidityPulse.mq5");
  return fs.readFile(file, "utf-8");
}

export default async function Page() {
  const code = await loadExpertCode();

  return <StrategyDashboard code={code} />;
}
