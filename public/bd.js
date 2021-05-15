(function () {

    chrome.webRequest.onBeforeSendHeaders.addEventListener(
      function (details) {
        var newRef = "http://manhua.dmzj.com/tags/riben.shtml";
        var hasRef = false;

        console.log(details);
        for (var n in details.requestHeaders) {
          hasRef = details.requestHeaders[n].name == "Referer";
          if (hasRef) {
            details.requestHeaders[n].value = newRef;
            break;
          }
        }
        if (!hasRef) {
          details.requestHeaders.push({ name: "Referer", value: newRef });
        }
        return { requestHeaders: details.requestHeaders };
      },
      {
        urls: ["http://images.dmzj.com/*"]
      },
      [
        "requestHeaders",
        "blocking"
      ]
    );

  })();