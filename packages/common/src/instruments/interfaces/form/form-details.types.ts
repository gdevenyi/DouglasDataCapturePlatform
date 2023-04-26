import { Language } from '@/core';

/** The details of the form to be displayed to the user */
export type FormDetails = {
  /** The title of the instrument in the language it is written, omitting the definite article */
  title: string;

  /** A brief description of the instrument, such as the purpose and history of the instrument */
  description: string;

  /** The language in which the fields of the instrument are written */
  language: Language;

  /** Brief instructions for how the subject should complete the instrument. If any array of string is provided, these are considered to be sequential. */
  instructions: string | string[];

  /** An integer representing the estimated number of minutes for the average target subject to complete the instrument */
  estimatedDuration: number;
};
