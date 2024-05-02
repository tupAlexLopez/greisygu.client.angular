import { StringBooleanPipe } from '../../src/app/pipes/string-boolean.pipe';

describe('StringBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new StringBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
