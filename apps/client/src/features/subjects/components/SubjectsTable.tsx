import React from 'react';

import { SubjectInterface } from 'common';

import { Button } from '@/components/base';
import { Table } from '@/components/core';

export interface SubjectTableProps {
  data: SubjectInterface[];
}

export const SubjectsTable = ({ data }: SubjectTableProps) => (
  <div>
    <div className="my-2 flex justify-between">
      <input
        required
        className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-2 text-sm"
        placeholder="Search..."
        type="search"
      />
      <div className="flex">
        <Button disabled className="mx-2" label="Filters" />
        <Button disabled label="Export" />
      </div>
    </div>
    <Table
      columns={[
        {
          name: 'Subject',
          field: (subject) => subject.identifier.slice(0, 6)
        },
        {
          name: 'Date of Birth',
          field: (subject) => subject.demographics.dateOfBirth
        },
        {
          name: 'Sex',
          field: (subject) => subject.demographics.sex
        },
        {
          name: 'Forward Sortation Area',
          field: (subject) => subject.demographics.forwardSortationArea
        },
        {
          name: 'Ethnicity',
          field: (subject) => subject.demographics.ethnicity
        },
        {
          name: 'Gender',
          field: (subject) => subject.demographics.gender
        },
        {
          name: 'Employment Status',
          field: (subject) => subject.demographics.employmentStatus
        },
        {
          name: 'Marital Status',
          field: (subject) => subject.demographics.maritalStatus
        },
        {
          name: 'First Language',
          field: (subject) => subject.demographics.firstLanguage
        }
      ]}
      data={data}
      entryLinkFactory={(subject) => subject.identifier}
    />
  </div>
);
