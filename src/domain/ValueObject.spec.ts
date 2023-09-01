import { describe, it, expect } from 'vitest';
import { ValueObject } from './ValueObject';

describe('ValueObject unit tests', () => {
  type Props = {
    id: number;
    name: string;
  };

  class ValueObjectTest extends ValueObject<Props> {
    constructor(props: Props) {
      super(props);
    }
  }

  it('Deve criar instância com sucesso', () => {
    const valueObjectTest = new ValueObjectTest({
      id: 1,
      name: 'Alexandre Odoni',
    });

    expect(valueObjectTest).toBeDefined();
  });

  it('Deve verificar que os valores das propriedades são idênticas', () => {
    const valueObjectTest1 = new ValueObjectTest({
      id: 1,
      name: 'Alexandre Odoni',
    });

    const valueObjectTest2 = new ValueObjectTest({
      id: 1,
      name: 'Alexandre Odoni',
    });

    expect(valueObjectTest1.equals(valueObjectTest2)).toBeTruthy();
  });

  it('Deve verificar que os valores das propriedades são diferentes', () => {
    const valueObjectTest1 = new ValueObjectTest({
      id: 1,
      name: 'Alexandre Odoni',
    });

    const valueObjectTest2 = new ValueObjectTest({
      id: 2,
      name: 'Alexandre Odoni',
    });

    expect(valueObjectTest1.equals(valueObjectTest2)).toBeFalsy();
  });
});
