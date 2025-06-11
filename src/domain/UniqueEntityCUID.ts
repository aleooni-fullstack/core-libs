import { createId } from '@paralleldrive/cuid2';
import { Identifier } from './Identifier';

export class UniqueEntityCUID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id || createId());
  }
}
