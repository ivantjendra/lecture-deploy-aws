const sum = require('./sum')

describe('Function sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  test('adds 6 + 10 to equal 16', () => {
    expect(sum(6, 10)).toBe(16);
  });
  
  test('adds 5 + 2 to equal 7', () => {
    expect(sum(5, 2)).toBe(7);
  });
})

// test(string, function)
// string -> Apa yang di test?