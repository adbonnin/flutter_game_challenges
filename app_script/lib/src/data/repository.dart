import 'package:collection/collection.dart';
import 'package:google_apps_script/google_apps_script.dart';

abstract class Repository<R> {
  R? fromRow(List<dynamic> row);

  List<dynamic> toRow(R value);

  const Repository({
    required this.ss,
    required this.name,
    this.firstContentIndex = 1,
  });

  final Spreadsheet ss;
  final String name;
  final int firstContentIndex;

  Sheet get sheet {
    return ss.getSheetByName(name);
  }

  Iterable<R> getAll() {
    return findAll((_) => true);
  }

  Iterable<R> findAll(bool Function(List<dynamic> value) predicate) {
    return sheet //
        .getDataRange()
        .getValues()
        .whereIndexed((index, element) => index >= firstContentIndex && predicate(element))
        .map(fromRow)
        .whereType<R>();
  }
}
