import { TestBed } from '@angular/core/testing';

import { DadosGuard } from './dados.guard';

describe('DadosGuard', () => {
  let guard: DadosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DadosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
