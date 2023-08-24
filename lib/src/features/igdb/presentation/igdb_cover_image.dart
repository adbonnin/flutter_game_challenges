import 'package:flutter/widgets.dart';
import 'package:flutter_game_challenges/src/features/igdb/application/igdb_providers.dart';
import 'package:flutter_game_challenges/src/widgets/async_value_widget.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class IgdbCoverImage extends ConsumerWidget {
  const IgdbCoverImage({
    super.key,
    required this.gameId,
  });

  final String? gameId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncImage = ref.watch(coverProvider(gameId));

    return AsyncValueWidget<List<int>>(
      value: asyncImage,
      data: (image) {
        return Text(image.toString());
      },
    );
  }
}
