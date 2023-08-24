@JS()
library code;

import 'dart:convert';

import 'package:app_script/src/application/challenge_service.dart';
import 'package:google_apps_script/google_apps_script.dart';
import 'package:js/js.dart';

@JS('doGet')
external set _doGet(Output? Function(DoGet) fn);

@JS('doPost')
external set _doPost(Output? Function(DoPost) fn);

void main() {
  final app = App();
  _doGet = allowInterop(app.dartDoGet);
  _doPost = allowInterop(app.dartDoPost);
}

class App {
  TextOutput? dartDoGet(DoGet e) {
    final parameters = e.parameters;
    final action = parameters['action']?.firstOrNull;

    if (action == 'getChallenges') {
      return _doGetChallenges();
    }

    return null;
  }

  TextOutput? dartDoPost(DoPost e) {
    return contentService.createTextOutput('test');
  }

  TextOutput _doGetChallenges() {
    final ss = spreadsheetApp.getActive();
    final service = ChallengeService(ss);

    final challenges = service.getAll();
    return _createJsonOutput(jsonEncode(challenges.map((e) => e.toJson()).toList()));
  }

  TextOutput _createJsonOutput(String json) {
    return contentService //
        .createTextOutput(json)
        .setMimeType(contentService.mimeType.json);
  }
}
