const Toki = {
    buy(merchantId, amount, orderId, description, callback, callbackUrl) {
        // in case of Android webview
        if (window.JSReceiver) {
            window.JSReceiver.buyfromShoppy(
                merchantId,
                amount,
                orderId,
                description,
                callbackUrl
            ); //Toki app will inject by this function in Android;
        }
        // in case of iOS webkit
        if (window.webkit && window.webkit.messageHandlers) {
            const message = JSON.stringify({
                merchantId,
                amount,
                orderId,
                description,
                callbackUrl,
            });

            window.webkit.messageHandlers.buyfromShoppy.postMessage(message);
            //Toki app will inject by this function in iOS
        }

        window.afterPurchase = (
            transactionID,
            orderID,
            status,
            statusCode,
            transRequestId
        ) => {
            callback(
                transactionID,
                orderID,
                status,
                statusCode,
                transRequestId
            );
            //Toki app will call this function once payment is done at app side.
        };
    },
};

export default Toki;
