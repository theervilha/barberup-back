type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: unknown) {
  const timestamp = new Date().toISOString();
  const base = { timestamp, level, message, ...((meta as object) || {}) };

  // Log estruturado em JSON
  // Em produção, é isso que ferramentas como Datadog/ELK gostam
  console.log(JSON.stringify(base));
}

export const logger = {
  info: (message: string, meta?: unknown) => log("info", message, meta),
  warn: (message: string, meta?: unknown) => log("warn", message, meta),
  error: (message: string, meta?: unknown) => log("error", message, meta),
};
