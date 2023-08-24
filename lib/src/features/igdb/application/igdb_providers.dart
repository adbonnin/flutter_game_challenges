import 'package:flutter_game_challenges/src/features/igdb/application/igdb_client.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'igdb_providers.g.dart';

@riverpod
Future<List<int>> cover(CoverRef ref, String? id) {
  return id == null ? Future.value([]) : ref.read(igdbClientProvider).getCover(id);
}
