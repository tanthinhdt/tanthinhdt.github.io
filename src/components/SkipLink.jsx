import { useLanguage } from '../useLanguage';

export default function SkipLink() {
  const { t } = useLanguage();
  return <a className="skip-link" href="#main-content">{t('controls.skipToContent')}</a>;
}
