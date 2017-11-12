(function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var response = {};
        switch (request.action) {
            case 'getState':
                updateStateToSession();
                response.state = getState();
                break;
            case 'setState':
                setState(request.state);
                restoreState();
        }
        sendResponse(response);
    });

    getState = function () {
        return JSON.parse(window.sessionStorage.getItem('redux_store'));
    }

    setState = function (state) {
        window.sessionStorage.setItem('redux_store', JSON.stringify(state));
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
            debugger;
            var state=JSON.parse(window.sessionStorage.getItem('redux_store'));
            var orignalState=window.__reduxStore__.getState();
            for(var key in Object.keys(state)){
                orignalState[Object.keys(state)[key]]= state[Object.keys(state)[key]];
            }
            window.__reduxStore__.dispatch({type:'sateRestore'});
        }
        + ')();';
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}