import { Suspense } from 'react';
import AcceptContent from './AcceptContent'; 

export default function AcceptPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <AcceptContent />
    </Suspense>
  );
}