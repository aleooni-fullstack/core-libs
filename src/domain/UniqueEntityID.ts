// import { v4 } from 'uuid';
import { createId } from '@paralleldrive/cuid2';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id || createId());
  }
}
