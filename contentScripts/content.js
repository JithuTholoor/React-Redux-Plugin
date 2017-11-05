var actualCode = '(' +
    function () {
        var originallog = console.log;
        console.log = function (txt, a, b) {
            window.sessionStorage.setItem('redux_store', JSON.stringify(b));
            originallog.apply(console, arguments);
        }        
    }
    + ')();';
var script = document.createElement('script');
script.textContent = actualCode;
(document.head || document.documentElement).appendChild(script);
script.remove();


(function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var response = {};
        debugger;        
        switch (request.action) {
            case 'getStore':
                response.data = getStoreData();
        }
        sendResponse(response);
    });
    getStoreData = function () {
        return window.sessionStorage.getItem('redux_store');
    }
})();
