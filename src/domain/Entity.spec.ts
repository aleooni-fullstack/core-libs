import { describe, it, expect } from 'vitest';

import { Entity } from './Entity';
import { UniqueEntityID } from './UniqueEntityID';

describe('Entity unit tests', () => {
  it('Deve criar uma classe entity com sucesso', () => {
    class EntityTest extends Entity<any> {}

    expect(EntityTest).toBeDefined();
  });

  it('Deve validar com sucesso classes como mesmo id', () => {
    class EntityTest extends Entity<any> {}

    const entityOne = new EntityTest(null, new UniqueEntityID('111'));
    const entityTwo = new EntityTest(null, new UniqueEntityID('111'));

    expect(entityOne.equals(entityTwo)).toBeTruthy();
  });

  it('Deve validar com sucesso classes como id diferente', () => {
    class EntityTest extends Entity<any> {}

    const entityOne = new EntityTest(null, new UniqueEntityID('111'));
    const entityTwo = new EntityTest(null, new UniqueEntityID('112'));

    expect(entityOne.equals(entityTwo)).toBeFalsy();
  });

  it('Deve instanciar uma classe e suas propriedades com sucesso', () => {
    type EntityTestProps = {
      myProp: any;
    };

    class EntityTest extends Entity<EntityTestProps> {}

    const props: EntityTestProps = { myProp: 'Hello' };
    const entityTest = new EntityTest(props);
    expect(entityTest.props).toStrictEqual({ myProp: 'Hello' });
  });
});
