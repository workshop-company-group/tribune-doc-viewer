/* SystemJS module definition */
declare const nodeModule: NodeModule;

interface NodeModule {
  id: string;
}

interface Window {
  // definition of electron special window properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  process: any;
  // definition of electron special window properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  require: any;
}
