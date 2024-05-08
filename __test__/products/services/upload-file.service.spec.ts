import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { FileService } from '../../../src/app/products/services/file.service';

import { ImageResponse } from '../../../src/app/shared/interfaces/response.interface';

import { environment } from '../../../src/environments/environment';

describe('UploadFileService', () => {
  let service: FileService;

  let imgBase64:string;
  let mockRequestFile:File;
  let mockNewRequestFile:File;
  let mockImageResponse:ImageResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(FileService);
  });

  beforeEach(()=> {
    imgBase64 = 'data:image/jpeg;base64,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'
    
    const byteCharacters = atob(imgBase64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const filename:string = 'image.jpeg';
    const typeFile:string = 'image/jpeg';

    
    mockRequestFile = new File([byteArray], filename, { type: typeFile });
    mockNewRequestFile = new File([byteArray], 'File modificiado', { type: typeFile });
  })

  beforeEach(()=> {
    mockImageResponse ={ 
      filename: mockRequestFile.name, 
      url: `${environment.url}/media/${mockRequestFile.name}` 
    }

  })

  test('Deberia inicializar el servicio', () => {
    expect(service).toBeTruthy();
  });

  test('Deberia subir un archivo', (done)=> {
    const spy = jest.spyOn( service, 'uploadImage' ).mockReturnValue( of( mockImageResponse ) );


    service.uploadImage( mockRequestFile )
    .subscribe( response => {
      expect( response.filename ).toEqual( mockRequestFile.name );
      expect( response.url ).toContain( `/media/${mockRequestFile.name}` );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  })
  
  test('Deberia actualizar un archivo', (done)=> {
    const spy = jest.spyOn( service, 'updateImage' ).mockReturnValue( of( mockImageResponse ) );

    service.updateImage( mockNewRequestFile.name, mockNewRequestFile )
    .subscribe( response => {
      expect( response.filename ).toEqual( mockRequestFile.name );
      expect( response.url ).toContain( `/media/${mockRequestFile.name}` );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  })
});
