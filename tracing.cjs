/* eslint-disable @typescript-eslint/no-var-requires */
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const opentelemetry = require("@opentelemetry/api");
const {
  Resource,
  detectResources,
  processDetector,
  envDetector,
  osDetector,
  hostDetector,
  browserDetector,
} = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  ConsoleSpanExporter,
  BatchSpanProcessor,
} = require("@opentelemetry/sdk-trace-base");
const { PrismaInstrumentation } = require("@prisma/instrumentation");
const {
  containerDetector,
} = require("@opentelemetry/resource-detector-container");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new PrismaInstrumentation(),
  ],
});
detectResources({
  detectors: [
    containerDetector,
    processDetector,
    envDetector,
    osDetector,
    hostDetector,
    browserDetector,
  ],
}).then((value) => {
  const resource = Resource.default()
    .merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "service-name-here",
        [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
      })
    )
    .merge(value);

  const provider = new NodeTracerProvider({
    resource: resource,
  });
  const exporter = new ConsoleSpanExporter();
  // const jaeger = new JaegerExporter();
  const processor = new BatchSpanProcessor(exporter);
  provider.addSpanProcessor(processor);

  provider.register();
});
