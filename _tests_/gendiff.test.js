import genDiff from '../index.js';

const expected = {
    '  host': 'hexlet.io',
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '- follow': false,
    '+ timeout': 20,
    '+ verbose': true
}

test("general differencies", () => {
    const actual = genDiff("__fixtures__/file1.json", "__fixtures__/file2.json");
    expect(actual).toEqual(expected);
})
