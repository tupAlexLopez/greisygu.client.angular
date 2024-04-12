import { StringBooleanPipe } from './string-boolean.pipe';

describe('StringBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new StringBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
