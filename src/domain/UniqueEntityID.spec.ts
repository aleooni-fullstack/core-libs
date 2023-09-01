import { describe, it, expect } from 'vitest';
import { UniqueEntityID } from './UniqueEntityID';

describe('UniqueEntityID unit tests', () => {
  it('Deve criar instância com ID tipo numérico fornecido', () => {
    const id = new UniqueEntityID(1);

    expect(id.toValue()).toBe(1);
  });

  it('Deve criar instância com ID tipo string fornecido', () => {
    const id = new UniqueEntityID('1');

    expect(id.toValue()).toBe('1');
  });

  it('Deve criar instância com ID criado automaticamente', () => {
    const id = new UniqueEntityID();

    expect(id.toValue()).toBeDefined();
  });
});
