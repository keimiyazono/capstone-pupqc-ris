import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Collaboration',
    default: 'Collaboration',
  },
};

export default function StudentCollaborationLayout({
  children,
}: React.PropsWithChildren) {
  return children;
}
