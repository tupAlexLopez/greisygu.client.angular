import { TestBed } from '@angular/core/testing';

import { FileService } from '../../../src/app/products/services/file.service';

describe('UploadFileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
