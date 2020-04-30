// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const BLACKLIST_KEY = 'blacklist';

const clearScript = 'localStorage.clear()';

const interceptScript = ' Storage.prototype._setItem = Storage.prototype.setItem;' +
    'Storage.prototype.setItem = function (key, value)' +
    '{' +
    'alert("works");' +
    '}';


chrome.webNavigation.onCommitted.addListener(checkBlackList);

function checkBlackList() {
    chrome.storage.sync.get([BLACKLIST_KEY], function (data) {
        const value = data.blacklist;
        const blacklistSites = value.split('\n');
        const sites = blacklistSites.filter(Boolean); // Filter empty strings
        const hostFilters = sites.map(site => ({hostEquals: site}));
        addListeners(hostFilters);
    });
}


function addListeners(filters){
        chrome.webNavigation.onDOMContentLoaded.addListener(clearAndIntercept, {url: filters});

}

function clearAndIntercept(){
    clearLocalStorage();
    interceptLocalStorage();
}

function clearLocalStorage(){
    chrome.tabs.query({active:true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: clearScript});
    });
}

function interceptLocalStorage(){
    chrome.tabs.query({active:true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: interceptScript});
    });
}


