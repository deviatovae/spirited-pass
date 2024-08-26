import ErrorPage from '@/components/ErrorPage';
import { ReturnHome } from '@/components/ReturnHome';

export default function NotFound() {
  return (
    <ErrorPage error="Oops! This page doesn't exist.">
      <ReturnHome />
    </ErrorPage>
  );
}
