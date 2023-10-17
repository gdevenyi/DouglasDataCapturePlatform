import { beforeEach, describe, expect, it } from 'bun:test';

import { createMock } from '@douglasneuroinformatics/nestjs/testing';
import { Test } from '@nestjs/testing';

import { FormsService } from '../forms.service';
import { InstrumentsRepository } from '../instruments.repository';

describe('FormsService', () => {
  let formsService: FormsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FormsService,
        {
          provide: InstrumentsRepository,
          useValue: createMock<InstrumentsRepository>
        }
      ]
    }).compile();
    formsService = moduleRef.get(FormsService);
  });

  it('should be defined', () => {
    expect(formsService).toBeDefined();
  });
});
