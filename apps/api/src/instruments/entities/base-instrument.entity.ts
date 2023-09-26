import type { BaseInstrument, InstrumentKind } from '@open-data-capture/types';

export abstract class BaseInstrumentEntity implements BaseInstrument {
  identifier: string;
  name: string;
  tags: string[];
  version: number;
  abstract kind: InstrumentKind;
  abstract content: any;
}
