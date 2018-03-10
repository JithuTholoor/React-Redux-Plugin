(function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var response = {};
        switch (request.action) {
            case 'getState':
                updateStateToSession();
                response.state = getState();
                break;
            case 'setState':
                setState(request.state,request.dispatchAction);
                restoreState();
        }
        sendResponse(response);
    });

    getState = function () {
        return JSON.parse(window.sessionStorage.getItem('redux_store'));
    }

    setState = function (state,dispatchAction) {
        window.sessionStorage.setItem('redux_store', JSON.stringify(state));
        window.sessionStorage.setItem('redux_action', JSON.stringify(dispatchAction));
    }
})();

function updateStateToSession() {
    var actualCode = '(' +
        function () {
            window.sessionStorage.setItem('redux_store', JSON.stringify(window.__reduxStore__.getState()));
        }
        + ')();';
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}

function restoreState() {
    var actualCode = '(' +
        function () {
            const action=JSON.parse(window.sessionStorage.getItem('redux_action'));
            var state=JSON.parse(window.sessionStorage.getItem('redux_store'));
            var orignalState=window.__reduxStore__.getState();
            for(var key in Object.keys(state)){
                orignalState[Object.keys(state)[key]]= state[Object.keys(state)[key]];
            }
            window.__reduxStore__.dispatch(JSON.parse(action));
        }
        + ')();';
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}