import React, { useState } from 'react';

import { FormInstrumentData } from '@douglasneuroinformatics/form-types';
import { Stepper, useNotificationsStore } from '@douglasneuroinformatics/ui';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  HiOutlineDocumentCheck,
  HiOutlineIdentification,
  HiOutlinePrinter,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi2';
import { useParams } from 'react-router-dom';

import { FormIdentification } from '../components/FormIdentification';
import { FormOverview } from '../components/FormOverview';
import { FormQuestions } from '../components/FormQuestions';
import { FormSummary } from '../components/FormSummary';
import { useFetchInstrument } from '../hooks/useFetchInstrument';

import { PageHeader } from '@/components/PageHeader';
import { Spinner } from '@/components/Spinner';
import { useActiveSubjectStore } from '@/stores/active-subject-store';
import { useAuthStore } from '@/stores/auth-store';

export const FormPage = () => {
  const params = useParams();
  const notifications = useNotificationsStore();
  const { t } = useTranslation();
  const { activeSubject } = useActiveSubjectStore();
  const { currentGroup } = useAuthStore();

  const instrument = useFetchInstrument(params.id!);

  const [result, setResult] = useState<FormInstrumentData>();
  const [timeCollected, setTimeCollected] = useState<number>(0);

  if (!instrument) {
    return <Spinner />;
  }

  const handleSubmit = async (data: FormInstrumentData) => {
    const now = Date.now();
    await axios.post('/v1/instruments/records/forms', {
      kind: 'form',
      time: Date.now(),
      instrumentName: instrument.name,
      instrumentVersion: instrument.version,
      groupName: currentGroup?.name,
      subjectInfo: activeSubject,
      data: data
    });
    setTimeCollected(now);
    setResult(data);
    notifications.addNotification({ message: t('instruments.formPage.uploadSuccessful'), type: 'success' });
  };

  return (
    <div>
      <PageHeader title={instrument.details.title} />
      <Stepper
        steps={[
          {
            element: <FormOverview details={instrument.details} />,
            label: t('instruments.formPage.overview.label'),
            icon: <HiOutlineDocumentCheck />
          },
          {
            element: <FormIdentification />,
            label: t('instruments.formPage.identification.label'),
            icon: <HiOutlineIdentification />
          },
          {
            element: <FormQuestions instrument={instrument} onSubmit={(data) => void handleSubmit(data)} />,
            label: t('instruments.formPage.questions.label'),
            icon: <HiOutlineQuestionMarkCircle />
          },
          {
            element: <FormSummary instrument={instrument} result={result} timeCollected={timeCollected} />,
            label: t('instruments.formPage.summary.label'),
            icon: <HiOutlinePrinter />
          }
        ]}
      />
    </div>
  );
};

export default FormPage;
