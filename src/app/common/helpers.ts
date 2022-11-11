enum SortingOrderEnum {
  ASCENDING = 1,
  DESCENDING = -1
}

interface GroupingPredicate<T> {
  groupField: keyof T;
  groupFieldMap?: (groupFieldValue: any) => any;
  groupingName?: string;
  subListName?: string;
  subListMap?: (item: T) => any;
  thenFilterBy?: (args: any) => boolean,
  thenGroupBy?: GroupingPredicate<T>;
  thenOrderBy?: SortingPredicate<T>;
}

interface SortingPredicate<T> {
  sortField: keyof T;
  order?: SortingOrderEnum;
  fn?: (args: any) => any;
  thenBy?: SortingPredicate<T>;
}

/**
 * Groups elements of a sequence by a specified field
 * @param data Sequence of values to group
 * @param params Grouping predicate(s)
 * @returns Grouped elements according to a predicate(s) for the type specified by the generic argument
 */
export const GROUP_BY = <T>(data: T[], params: GroupingPredicate<T>): any[] => {
  const groups: any = data.reduce<T[]>((subGroup: any[], item: T) => {
    let field;
    if (params.groupFieldMap) {
      field = params.groupFieldMap(item[params.groupField]);
    }
    else {
      field = item[params.groupField];
    }

    if (!subGroup[field]) {
      subGroup[field] = [];
    }

    if (params.thenFilterBy) {
      if(params.thenFilterBy(item[params.groupField])) {
        subGroup[field].push(params.subListMap ? params.subListMap(item) : item);
      }
      else {
        delete subGroup[field];
      }
    }
    else {
      subGroup[field].push(params.subListMap ? params.subListMap(item) : item);
    }

    return subGroup;
  }, [] as T[]);

  const result: any[] = Object.keys(groups).map(value => {
    const subList = params.thenGroupBy
      ? GROUP_BY(groups[value], params.thenGroupBy)
      : params.thenOrderBy
        ? ORDER_BY(groups[value], params.thenOrderBy)
        : groups[value];

    return {
      [params.groupingName || params.groupField]: value,
      [params.subListName || "subList"]: subList
    };
  });

  return result;
};

/**
 * Sorts the elements of a sequence in ascending or descending order according to a predicate(s)
 * Inspired by LinQ OrderBy method
 * @param data Sequence of values to order
 * @param params Sorting predicate(s)
 * @returns Sorted elements according to a predicate(s) for the type specified by the generic argument
 */
const ORDER_BY = <T>(data: T[], params: SortingPredicate<T>): T[] => {
  return data.sort((a, b) => COMPARE_FN<T>(params, a, b));
};

/**
 * Default sorting comparer between two objects (generic)
 * @param sp Sorting predicate(s)
 * @param a first object (generic)
 * @param b second object (generic)
 * @returns Default sort order comparer for the type specified by the generic argument
 */
const COMPARE_FN = <T>(sp: SortingPredicate<T> | undefined, a: T, b: T): number => {
  if (sp && sp.sortField) {
    const orderValue = sp.order || SortingOrderEnum.ASCENDING;
    const key = (o: T) => (sp.fn ? sp.fn(o[sp.sortField]) : o[sp.sortField]);
    const keyA = key(a);
    const keyB = key(b);

    if (keyA > keyB) {
      return orderValue;
    }
    if (keyA < keyB) {
      return -1 * orderValue;
    }
    return COMPARE_FN<T>(sp.thenBy, a, b);
  } else {
    return 0;
  }
};

export const ISearch = (str: string, substr: string): boolean => {
  str = str.trim().toLowerCase();
  const substrs = substr.trim().toLowerCase().split(/[, -]+/).filter(Boolean);
  const result = substrs.some(_substr => str.includes(_substr))
  return result;
};
