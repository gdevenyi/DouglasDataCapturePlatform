import { Spinner } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';

export const SetupLoadingScreen = () => {
  const { t } = useTranslation('setup');
  return (
    <div className="my-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="mt-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          {t('loadingSubtitle')}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{t('loadingTitle')}</h1>
      </div>
      <div className="h-min p-48">
        <Spinner />
      </div>
    </div>
  );
};
