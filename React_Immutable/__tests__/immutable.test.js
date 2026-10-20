import { Map, List, isImmutable } from 'immutable';
import getFromJS from '../0-fromjs';
import getMap from '../1-map';
import accessImmutableObject from '../2-nested';
import { getListObject, addElementToList } from '../3-list';
import { map, map2 } from '../4-mutations';
import { concatElements, mergeElements } from '../5-merge';
import mergeDeeplyElements from '../6-deeply';
import areMapsEqual from '../7-equality';
import printBestStudents from '../8-seq';

const obj = {
  fear: true, smell: -1033575916.9145899, wall: false, thing: -914767132,
};

describe('immutable tasks', () => {
  it('0-fromjs returns a Map', () => {
    expect.hasAssertions();
    const m = getFromJS(obj);
    expect(Map.isMap(m)).toBe(true);
    expect(m.size).toBe(4);
    expect(m.toJS()).toStrictEqual(obj);
  });

  it('1-map returns a Map', () => {
    expect.hasAssertions();
    const m = getMap(obj);
    expect(Map.isMap(m)).toBe(true);
    expect(m.get('wall')).toBe(false);
  });

  it('2-nested accesses paths', () => {
    expect.hasAssertions();
    const o = { name: { first: 'Guillaume', last: 'Salva' } };
    expect(accessImmutableObject(o, ['name', 'first'])).toBe('Guillaume');
    expect(Map.isMap(accessImmutableObject(o, ['name']))).toBe(true);
    expect(accessImmutableObject(o, ['nope'])).toBeUndefined();
  });

  it('3-list creates and pushes', () => {
    expect.hasAssertions();
    const l = getListObject(['a', 'b']);
    expect(List.isList(l)).toBe(true);
    const l2 = addElementToList(l, 'c');
    expect(l2.toJS()).toStrictEqual(['a', 'b', 'c']);
    expect(l.size).toBe(2);
  });

  it('4-mutations', () => {
    expect.hasAssertions();
    expect(map.get('2')).toBe('Noah');
    expect(map2.get(2)).toBe('Benjamin');
    expect(map2.get(4)).toBe('Oliver');
    expect(map2.get('1')).toBe('Liam');
  });

  it('5-merge', () => {
    expect.hasAssertions();
    expect(concatElements([1, 2], [3]).toJS()).toStrictEqual([1, 2, 3]);
    expect(isImmutable(concatElements([1], [2]))).toBe(true);
    expect(mergeElements({ a: 1, b: 2 }, { b: 3, c: 4 }).toJS()).toStrictEqual({ a: 1, b: 3, c: 4 });
  });

  it('6-deeply', () => {
    expect.hasAssertions();
    const page1 = { 'user-1': { id: 1, name: 'test', likes: { 1: { uid: 1234 } } } };
    const page2 = { 'user-1': { likes: { 2: { uid: 134 } } } };
    expect(mergeDeeplyElements(page1, page2).toJS()).toStrictEqual({
      'user-1': {
        id: 1, name: 'test', likes: { 1: { uid: 1234 }, 2: { uid: 134 } },
      },
    });
  });

  it('7-equality', () => {
    expect.hasAssertions();
    const a = new Map({ firstName: 'Guillaume', lastName: 'Salva' });
    const b = new Map({ firstName: 'Guillaume', lastName: 'Salva' });
    expect(areMapsEqual(a, b)).toBe(true);
    expect(areMapsEqual(a, b.set('lastName', 'X'))).toBe(false);
  });

  it('8-seq prints best students capitalized', () => {
    expect.hasAssertions();
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    printBestStudents({
      1: { score: 99, firstName: 'guillaume', lastName: 'salva' },
      2: { score: 10, firstName: 'bad', lastName: 'student' },
    });
    expect(spy).toHaveBeenCalledWith({
      1: { score: 99, firstName: 'Guillaume', lastName: 'Salva' },
    });
    spy.mockRestore();
  });
});
