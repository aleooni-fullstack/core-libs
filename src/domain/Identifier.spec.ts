import { describe, it, expect } from 'vitest';
import { Identifier } from './Identifier';

describe('Identifier unit tests', () => {
  it('Deve criar instância com sucesso', () => {
    const identifier = new Identifier<string>('Ola');

    expect(identifier).toBeDefined();
  });

  it('Deve executar método toString com sucesso para string', () => {
    const identifier = new Identifier<string>('Ola');

    expect(identifier.toString()).toBe('Ola');
  });

  it('Deve executar método toValue com sucesso para string', () => {
    const identifier = new Identifier<string>('Ola');

    expect(identifier.toValue()).toBe('Ola');
  });

  it('Deve executar método toString com sucesso para número', () => {
    const identifier = new Identifier<number>(12);

    expect(identifier.toString()).toBe('12');
  });

  it('Deve executar método toValue com sucesso para número', () => {
    const identifier = new Identifier<number>(12);

    expect(identifier.toValue()).toBe(12);
  });

  it('Deve executar método toString com sucesso para booleano', () => {
    const identifier = new Identifier<boolean>(true);

    expect(identifier.toString()).toBe('true');
  });

  it('Deve executar método toValue com sucesso para booleano', () => {
    const identifier = new Identifier<boolean>(true);

    expect(identifier.toValue()).toBe(true);
  });
});
