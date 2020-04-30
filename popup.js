// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let submit = document.getElementById('submit');
let blacklist = document.getElementById('blacklist-input');

const BLACKLIST_KEY = 'blacklist';
chrome.storage.sync.get([BLACKLIST_KEY], function(data) {
    console.log(data.blacklist);
    blacklist.value = data.blacklist;
});

submit.onclick = function(element) {
	// chrome.tabs.query({active:true}, function(tabs) {
	//     chrome.tabs.executeScript(tabs[0].id, {code: 'localStorage.clear()'});
	// });
    const currentBlacklist = blacklist.value;
    chrome.storage.sync.set({blacklist: currentBlacklist}, function() {
        console.log('Value is set to ' + currentBlacklist);
    });
  };
