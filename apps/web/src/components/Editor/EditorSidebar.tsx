import { DocumentIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import type { EditorModel } from './types';

export type EditorSidebarProps = {
  isOpen: boolean;
  models: EditorModel[];
  onSelection: (id: string) => void;
  selectedModel: EditorModel | null;
};

export const EditorSidebar = ({ isOpen, models, onSelection, selectedModel }: EditorSidebarProps) => {
  return (
    <motion.div
      animate={{ width: isOpen ? 320 : 0 }}
      className="flex-shrink-0 overflow-hidden shadow-sm"
      initial={{ width: 0 }}
    >
      <div className="h-full w-full border-r border-slate-900/10 dark:border-slate-100/25">
        {models.map((model) => (
          <button
            className={twMerge(
              'flex w-full items-center gap-2 p-2 text-sm',
              selectedModel?.id === model.id && 'bg-slate-100 dark:bg-slate-700'
            )}
            key={model.id}
            type="button"
            onClick={() => onSelection(model.id)}
          >
            <DocumentIcon height={14} width={14} />
            <span>{model.uri.path.slice(1)}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
