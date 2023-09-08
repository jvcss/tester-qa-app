import { expect } from 'chai';

import { describe, it } from 'node:test';

describe('Example Test Suite', () => {
  it('should add two numbers', () => {
    const result = 1 + 2;
    expect(result).to.equal(3);
  });
});