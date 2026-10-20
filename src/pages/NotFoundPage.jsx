import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../useLanguage';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="page-content container not-found-page">
      <span className="tag">404</span>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link to="/" className="btn-primary">
        <ArrowLeft size={17} />
        {t('notFound.action')}
      </Link>
    </div>
  );
}
