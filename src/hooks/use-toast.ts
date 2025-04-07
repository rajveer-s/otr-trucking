import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const { title, description, variant = 'default' } = options;

    if (variant === 'destructive') {
      sonnerToast.error(description || title);
    } else {
      sonnerToast.success(description || title);
    }
  };

  return { toast };
}
