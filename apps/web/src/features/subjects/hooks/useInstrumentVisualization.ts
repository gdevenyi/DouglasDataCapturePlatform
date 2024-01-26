import { useEffect, useMemo, useState } from 'react';

import { useDownload, useNotificationsStore } from '@douglasneuroinformatics/ui';
import type { AnyUnilingualFormInstrument } from '@open-data-capture/common/instrument';
import { useTranslation } from 'react-i18next';

import { useInstrument } from '@/hooks/useInstrument';
import { useInstrumentRecords } from '@/hooks/useInstrumentRecords';
import { useInstrumentSummaries } from '@/hooks/useInstrumentSummaries';
import { useAuthStore } from '@/stores/auth-store';

export type InstrumentVisualizationRecord = {
  [key: string]: unknown;
  __date__: Date;
  __time__: number;
};

export type UseInstrumentVisualizationOptions = {
  params: {
    subjectId: string;
  };
};

export function useInstrumentVisualization({ params }: UseInstrumentVisualizationOptions) {
  const { currentGroup, currentUser } = useAuthStore();
  const download = useDownload();
  const notifications = useNotificationsStore();
  const { t } = useTranslation('common');

  const [records, setRecords] = useState<InstrumentVisualizationRecord[]>([]);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [instrumentId, setInstrumentId] = useState<null | string>(null);

  const instrument: AnyUnilingualFormInstrument | null = useInstrument(instrumentId, { kind: 'FORM' });

  const summariesQuery = useInstrumentSummaries({ params: { kind: 'FORM' } });
  const recordsQuery = useInstrumentRecords({
    enabled: instrumentId !== null,
    params: {
      groupId: currentGroup?.id,
      instrumentId: instrumentId!,
      kind: 'FORM',
      minDate: minDate ?? undefined,
      subjectId: params.subjectId
    }
  });

  const dl = (option: 'CSV' | 'JSON') => {
    if (!instrument) {
      notifications.addNotification({ message: t('errors.noInstrumentSelected'), type: 'error' });
      return;
    } else if (records.length === 0) {
      notifications.addNotification({ message: t('errors.noDataToExport'), type: 'error' });
      return;
    }

    const baseFilename = `${currentUser!.username}_${instrument.name}_${
      instrument.version
    }_${new Date().toISOString()}`;

    switch (option) {
      case 'JSON':
        void download(`${baseFilename}.json`, () => Promise.resolve(JSON.stringify(records, null, 2)));
        break;
      case 'CSV':
        void download(`${baseFilename}.csv`, () => {
          const columnNames = Object.keys(records[0]);
          const rows = records.map((item) => Object.values(item).join(',')).join('\n');
          return Promise.resolve(columnNames + '\n' + rows);
        });
    }
  };

  useEffect(() => {
    if (recordsQuery.data) {
      const records: InstrumentVisualizationRecord[] = [];
      for (const record of recordsQuery.data) {
        const props = record.data && typeof record.data === 'object' ? record.data : {};
        records.push({
          __date__: record.date,
          __time__: record.date.getTime(),
          ...record.computedMeasures,
          ...props
        });
      }
      setRecords(records);
    }
  }, [recordsQuery.data]);

  const instrumentOptions: Record<string, string> = useMemo(() => {
    const options: Record<string, string> = {};
    if (summariesQuery.data) {
      for (const summary of summariesQuery.data) {
        options[summary.id] = summary.details.title;
      }
    }
    return options;
  }, [summariesQuery.data]);

  return { dl, instrument, instrumentId, instrumentOptions, minDate, records, setInstrumentId, setMinDate };
}