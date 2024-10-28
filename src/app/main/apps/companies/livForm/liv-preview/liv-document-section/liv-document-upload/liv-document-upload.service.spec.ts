import { TestBed } from '@angular/core/testing';

import { LivDocumentUploadService } from './liv-document-upload.service';

describe('LivDocumentUploadService', () => {
  let service: LivDocumentUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivDocumentUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
