import { TestBed } from '@angular/core/testing';

import { HeaderButtonsService } from './header-buttons.service';

describe('HeaderButtonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderButtonsService = TestBed.get(HeaderButtonsService);
    expect(service).toBeTruthy();
  });
});
