import { Prop, SchemaFactory } from '@nestjs/mongoose';

import type { FormInstrumentRecord, Group, Subject } from '@open-data-capture/types';

import { FormInstrumentEntity } from './form-instrument.entity';

export class FormInstrumentRecordEntity implements FormInstrumentRecord {
  kind: 'form';
  time: number;
  instrument: FormInstrumentEntity;
  group: Group;
  subject: Subject;

  @Prop({ required: true, type: Object })
  data: Record<string, any>;
}

export const FormInstrumentRecordSchema = SchemaFactory.createForClass(FormInstrumentRecordEntity);