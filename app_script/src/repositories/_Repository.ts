import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export abstract class Repository<T> {
  abstract toValue?(object: any[]): T | null;

  protected constructor(public ss: Spreadsheet,
                        public name: string,
                        private firstContentIndex: number = 1) {
  }

  getSheet(): Sheet {
    return this.ss.getSheetByName(this.name);
  }

  getAll(): T[] {
    return this.findAll(() => true);
  }

  findAll(predicateFn: (value: any[], index: number, array: any[][]) => boolean): T[] {
    const sheet = this.getSheet();
    const self = this;

    function filterFct(value: any[], index: number, array: any[][]) {
      return index >= self.firstContentIndex &&
        predicateFn(value, index, array)
    }

    const values = sheet.getDataRange().getValues();
    return values.filter(filterFct).map(this.toValue).filter((value) => value);
  }
}