import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';

import logo from '@/assets/logo.png';
import { Footer } from '@/components';
import { useFingerprint } from '@/hooks/useFingerprint';

export const LoginPage = () => {
  const navigate = useNavigate();
  const fingerprint = useFingerprint();
  const { t } = useTranslation('auth');

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 sm:bg-slate-100">
      <div className="flex flex-col items-center rounded-lg bg-slate-50 px-12 py-8 sm:w-[24rem]">
        <img alt="logo" className="m-1 w-16" src={logo} />
        <h1 className="text-2xl font-bold">{t('login.pageTitle')}</h1>
        <div className="mt-3 w-full">
          <LoginForm onSuccess={() => navigate('/overview')} />
        </div>
        <br className="my-2" />
        <Footer isLogin />
      </div>
    </div>
  );
};
