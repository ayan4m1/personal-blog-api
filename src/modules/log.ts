import type { TransformableInfo } from 'logform';
import { Container, format, transports, Logger } from 'winston';

const { Console } = transports;
const { combine, label, prettyPrint, printf } = format;

const container = new Container();
const loggers = new Map<string, Logger>();

const createLogger = (category: string, categoryLabel: string): Logger => {
  const formatter = (data: TransformableInfo) =>
    `[${data.level}][${data.label}] ${data.message}`;
  const formatters = [label({ label: categoryLabel })];

  formatters.push(prettyPrint(), printf(formatter));
  container.add(category, {
    transports: [
      new Console({
        level: process.env.LOG_LEVEL ?? 'info',
        format: combine(...formatters)
      })
    ]
  });

  return container.get(category);
};

export const getLogger = (
  category: string,
  categoryLabel: string = category
): Logger => {
  if (!loggers.has(category)) {
    loggers.set(category, createLogger(category, categoryLabel));
  }

  return loggers.get(category);
};
