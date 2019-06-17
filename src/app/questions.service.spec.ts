import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './Services/questions.service';

describe('QuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsService = TestBed.get(QuestionsService);
    expect(service).toBeTruthy();
  });
});
