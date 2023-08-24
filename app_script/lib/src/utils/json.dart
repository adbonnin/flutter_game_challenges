class Json {
  Json._();

  static List<T> fromList<T>(
    Object? json,
    T Function(Map<String, dynamic> json) fromJson,
  ) {
    if (json is! Iterable<dynamic>) {
      return [];
    }

    return json //
        .whereType<Map<String, dynamic>>()
        .map(fromJson)
        .toList();
  }
}
